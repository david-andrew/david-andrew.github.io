import { useState, useEffect, useRef } from 'react'
import { useLocation, useHistory } from 'react-router'
import { getGithubTimestamp } from '../Components'
import { toMonthDayYearString, toMonthYearString } from './'
import DewyParserWrapper from '../wasm/dewy_parser_wrapper'

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
export const useGithubTimestamp = (repoName: string, includeDay: boolean = false): string => {
    //fetch the timestamp and store into the timestamp state
    //undefined indicates not yet returned, null indicates failed to fetch
    const [timestamp, setTimestamp] = useState<Date | undefined | null>()
    useEffect(() => {
        getGithubTimestamp(repoName, (repoTimestamp?: Date) => {
            setTimestamp(repoTimestamp ?? null)
        })
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

//hook for managing dewy parser web assembly
export const useDewyWasm = (grammar_source: string, input_source: string): string | undefined => {
    //promise to the wasm interface module
    const wasmPromiseRef = useRef<Promise<any>>()

    //handling of string output from the parser process
    const [parserOutput, addParserChunk, flushParserOutput, resetParserOutput] = useStringBuffer()

    const [grammarError, setGrammarError] = useState<boolean>(false)

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
                    console.error('grammar error')
                    setGrammarError(true)
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
            setGrammarError(false)
        }
    }, [grammar_source, input_source])

    //return the parser output as a single string
    //TODO->break up the output based on specific sections of the string e.g. \n>>>>>>>>>>TABLE>>>>>>>>>>\n etc.
    return parserOutput
}

//delay updating a string so that the inputs can feel responsive to typing in them, and then when the user stops typing the process is run
export const useDelayedText = (text: string, delayMs: number = 200): string | undefined => {
    //text to emit after delay interval
    const [delayedText, setDelayedText] = useState<string | undefined>()

    //reference to the handle of the set timeout (so we can cancel if the text changes during the delay)
    const timeoutHandleRef = useRef<number>()

    //cancel the current timeout if on was in progress
    if (timeoutHandleRef.current !== undefined) {
        window.clearTimeout(timeoutHandleRef.current)
        timeoutHandleRef.current = undefined
    }

    //create a new timeout that sets the text at the end of the delay
    timeoutHandleRef.current = window.setTimeout(() => {
        setDelayedText(text)
        timeoutHandleRef.current = undefined
    }, delayMs)

    return delayedText
}
