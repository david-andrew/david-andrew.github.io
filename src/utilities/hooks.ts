import { useState, useEffect, useRef, useMemo } from 'react'
import { useLocation, useHistory } from 'react-router'
import { getGithubTimestamp } from '../Components'
import { toMonthDayYearString, toMonthYearString } from './'
import DewyParserWrapper from '../wasm/dewy_parser_wrapper'
import { projectRouteMap, ProjectContent, projects } from '../Pages/Projects/ProjectSummaries'

interface useQueryReturn {
    params: { [key: string]: string }
    setParam: (key: string, value: string) => void
    clearParam: (key: string) => void
}

//custom hook for managing query parameters in the url
export const useQuery = (): useQueryReturn => {
    const history = useHistory()
    const { pathname, search } = useLocation()

    //convert the search string to a query object
    const urlParams = new URLSearchParams(search)

    //convert the query object to a dictionary containing each entry
    const params: useQueryReturn['params'] = {}
    urlParams.forEach((value: string, key: string) => {
        params[key] = value
    })

    //callback functions for changing the url parameters
    const setParam = (key: string, value: string): void => {
        urlParams.set(key, value)
        history.push({ pathname, search: urlParams.toString() })
    }
    const clearParam = (key: string): void => {
        urlParams.delete(key)
        history.push({ pathname, search: urlParams.toString() })
    }

    return { params, setParam, clearParam }
}

//Hook for getting a timestamp string for a given git repo
export const useGithubTimestamp = (repoName: string | undefined, includeDay: boolean = false): string => {
    //fetch the timestamp and store into the timestamp state
    //undefined indicates not yet returned, null indicates failed to fetch
    const [timestamp, setTimestamp] = useState<Date | undefined | null>()
    useEffect(() => {
        if (repoName !== undefined) {
            getGithubTimestamp(repoName, (repoTimestamp?: Date) => {
                setTimestamp(repoTimestamp ?? null)
            })
        } else {
            setTimestamp(null)
        }
        return (): void => setTimestamp(undefined)
    }, [repoName])

    //handle the string output based on the value of the timestamp
    const [timestampStr, setTimestampStr] = useState<string>('Fetching Date...')
    useEffect(() => {
        if (timestamp === undefined) {
            setTimestampStr('Fetching Date...')
        } else if (timestamp === null) {
            setTimestampStr('Unknown Date')
        } else {
            setTimestampStr(includeDay ? toMonthDayYearString(timestamp) : toMonthYearString(timestamp))
        }
    }, [timestamp, includeDay])

    return timestampStr
}

//hook for managing strings output from the dewy parser process
export const useStringBuffer = (): [string | undefined, (chunk: string) => void, () => void, () => void] => {
    // const [buffer, setBuffer] = useState<string | undefined>()
    const bufferRef = useRef<string[]>()
    const [output, setOutput] = useState<string | undefined>()

    //add a chunk to the buffer
    const addChunk = (chunk: string): void => {
        if (bufferRef.current === undefined) {
            bufferRef.current = []
        }
        bufferRef.current.push(chunk)
    }

    //call when done reading input to turn on the output string
    const flushBuffer = (): void => {
        //combine every chunk into a single big string
        setOutput(bufferRef.current?.join('\n'))
    }

    //reset everything to initial
    const reset = (): void => {
        bufferRef.current = undefined
        setOutput(undefined)
    }

    return [output, addChunk, flushBuffer, reset]
}

export interface ParserOutput {
    metascanner?: string
    metaast?: string
    metaparser?: string
    grammarFirsts?: string
    grammarItems?: string
    table?: string
    result?: string
    forest?: string
    grammarError?: string
    // parseFailed: boolean
}
const splitParserOutput = (raw?: string): ParserOutput | undefined => {
    if (raw === undefined) {
        return undefined
    }
    const endArrows = '<<<<<<<<<<<<'
    const [metascanner, metaast, metaparser, grammar, table, result, forest] = raw.split(`${endArrows}`) as (string | undefined)[]
    const [grammarFirsts, grammarItems] = grammar?.split('itemsets:\n') ?? [undefined, undefined]

    const grammarErrorIndex = raw.indexOf('ERROR: ')
    const grammarError = grammarErrorIndex >= 0 ? raw.slice(grammarErrorIndex) : undefined
    const parseError = (result?.indexOf('failure') ?? -1) >= 0

    return {
        metascanner: metascanner?.trimEnd(),
        metaast: metaast?.trimEnd(),
        metaparser: metaparser?.trimEnd(),
        grammarFirsts: grammarFirsts?.slice('first sets:\n'.length).trimEnd(),
        grammarItems: grammarItems?.trimEnd(),
        table: table?.trimEnd(),
        result: result?.trimEnd(),
        forest: parseError ? 'Parse failed' : forest?.trimEnd(),
        grammarError,
    }
}

//hook for managing dewy parser web assembly
//normally you would be able to load the wasm once, and then call the cwrapped function over and over
//but that caused the parser to crash, so the hacky fix is to just reload the whole wasm module every time
export const useDewyWasm = (grammar_source: string, input_source: string): ParserOutput | undefined => {
    //promise to the wasm interface module
    const wasmPromiseRef = useRef<Promise<any>>()

    //handling of string output from the parser process
    const [parserOutput, addParserChunk, flushParserOutput, resetParserOutput] = useStringBuffer()

    //handle setting up the wasm module and the function for calling the parser
    useEffect(() => {
        //kick of the loading process for getting the functions, and then call the result
        wasmPromiseRef.current = DewyParserWrapper({
            onRuntimeInitialized: async () => {
                //save the function for calling the parser
                console.log('wasm runtime initialized')
                const wasm: any = await wasmPromiseRef.current
                const dewyParser = wasm.cwrap('dewy_parser', 'void', ['string', 'string'])
                try {
                    dewyParser(grammar_source, input_source)
                } catch {
                } finally {
                    flushParserOutput()
                }
            },
            //override the module's code for locating the wasm binary
            /* eslint-disable @typescript-eslint/no-var-requires */
            locateFile: () => require('../wasm/dewy_parser_wrapper.wasm').default,
            //override the print function to write to our custom buffer
            print: (text: string) => {
                addParserChunk(text)
                // console.log(`pushing chunk: ${text}`)
            },
        })

        //clean up at the end of every render
        return (): void => {
            resetParserOutput()
        }
    }, [grammar_source, input_source])

    //return the parser output as a single string
    return splitParserOutput(parserOutput)
}

//delay updating a string so that the inputs can feel responsive to typing in them, and then when the user stops typing the process is run
export const useDelayed = <T>(items: T[], delayMs: number = 200): T[] => {
    //text to emit after delay interval
    const [delayedItem, setDelayedItem] = useState<T[]>(items)

    //reference to the handle of the set timeout (so we can cancel if the text changes during the delay)
    const timeoutHandleRef = useRef<number>()

    useEffect(() => {
        //cancel the current timeout if on was in progress
        if (timeoutHandleRef.current !== undefined) {
            window.clearTimeout(timeoutHandleRef.current)
            timeoutHandleRef.current = undefined
        }

        //create a new timeout that sets the text at the end of the delay
        timeoutHandleRef.current = window.setTimeout(() => {
            console.log('setting item', items)
            setDelayedItem(items)
            timeoutHandleRef.current = undefined
        }, delayMs)
    }, [...items])

    return delayedItem
}

//hook for loading all the clover images to the cache so that they load quickly when you click that page
export const useLoadClovers = (): void => {
    //preload all the images. when an image is loaded, allow the collage to show it
    useEffect(() => {
        const r = require.context('../images/clovers')
        const cloverSrcs: string[] = r.keys().map((path: string) => r(path).default) as string[]
        console.log('clover sources: ', cloverSrcs)
        ;(async (): Promise<void> => {
            //load each image sequentially
            for (const src of cloverSrcs) {
                const promise = new Promise<void>((resolve /*, reject*/) => {
                    const img = new Image()
                    img.src = src
                    img.onload = (): void => {
                        console.log('loaded image', src)
                        resolve()
                    }
                    img.onerror = (): void => {
                        console.log('failed to load image', src)
                        resolve() //reject()
                    }
                })
                await promise
            }
        })()
    }, [])
}

//return a project item for a given route
export const useProjectData = (url: string): ProjectContent => {
    const project = useMemo(() => projectRouteMap[url], [url])
    return project
}

//returns a list of dates, one for each project, handling promises from github timestamp retrieval
export const useProjectDates = (): (Date | undefined)[] | undefined => {
    //get the dates for sorting projects. since some dates come from github,
    const [projectDates, setProjectDates] = useState<(Date | undefined)[] | undefined>()
    useEffect(() => {
        ;(async (): Promise<void> => {
            const projectDatePromises = projects.map(async (project: ProjectContent) => {
                let timestamp = undefined
                if (project.github !== undefined) {
                    await getGithubTimestamp(project.github, (t: Date | undefined) => {
                        timestamp = t
                    })
                } else if (project.lastUpdated !== undefined) {
                    timestamp = new Date(Date.parse('01 ' + project.lastUpdated))
                }
                return timestamp
            })
            setProjectDates(await Promise.all(projectDatePromises))
        })()
    }, [projects])
    return projectDates
}
