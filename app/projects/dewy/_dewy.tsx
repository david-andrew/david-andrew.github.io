'use client'
import { useState, useEffect, useRef } from 'react'
import { useXterm } from './terminal'
import { PyModule, usePython } from '@/app/(hooks)/pyodide'
import { Loading } from '@/app/loading'
import { Accordion } from '@/app/(components)/accordion'
import { FetchedDewySourceExamples } from './fetch_dewy'

import { CodeEditor } from '@/app/(components)/syntax'
import { dewy_lang, dewy_theme } from '@/app/(components)/syntax_dewy'
import { twMerge } from 'tailwind-merge'

/*
[Tasks]
[x] switch to the correct code editor+terminal (probably in _dewy file?)
[x] terminal handling input request
[x] change font in terminal to monospace and correct size!
[x] merge branch to master
[x] example program presets you can click
[x] make run button + code editor disabled while running
[x] handling hitting pdb. probably replace pdb call with a message and exit(1)
[x] syntax highlighting
[x] mobile firefox never loads
[x] catching exceptions in the demo
[x] "undefined" printed out at the end of the loop example


*/

const createDewyRunner = (src: string) => {
    const escaped_source = src.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
    return `
from src.tokenizer import tokenize
from src.postok import post_process
from src.postparse import post_parse
from src.parser import top_level_parse
from src.backend.python import top_level_evaluate, BuiltinFuncs
from functools import partial


#TBD if this is needed, causes an error, and seems to work without...
# update the builtin print function to flush after every use
#BuiltinFuncs.print = partial(print, end='', flush=True)
#BuiltinFuncs.printl = partial(print, flush=True),
#BuiltinFuncs.readl = input


# define main entry point
def dewy(src:str):
    # tokenize and parse
    tokens = tokenize(src)
    post_process(tokens)
    ast = top_level_parse(tokens)
    ast = post_parse(ast)

    # run the program
    res = top_level_evaluate(ast)
    # if res is not void: print(res) #causes weird behavior in most cases


# replace pdb.set_trace with a message and exit(1)
import pdb
def pdb_set_trace():
    print('ERROR: encountered syntax which is not yet implemented. exiting.', flush=True)
    exit(1)
pdb.set_trace = pdb_set_trace


# run dewy source code
try:
    dewy('''${escaped_source}'''); sys.stdout.flush()
except IOError:
    print('ERROR: failed to read input. exiting.', flush=True)
except Exception as e:
    import traceback
    stack = traceback.format_exc()
    print(f'ERROR: {e}\\n{stack}', flush=True)
    print('ERROR: encountered problem while running. exiting.', flush=True)
`
}

export type DewyDemoProps = {
    dewy_interpreter_source: PyModule[]
    dewy_examples?: FetchedDewySourceExamples
    initial_code?: string
}

const DewyDemo = ({ dewy_interpreter_source, dewy_examples, initial_code }: DewyDemoProps): JSX.Element => {
    const [ready, setReady] = useState(false)
    const [running, setRunning] = useState(false)
    const [source, setSource] = useState(
        initial_code ?? "print'what is your name? '\nname = readl\nprintl'Hello {name}'",
    )

    const { divRef, write, read, clear, focus } = useXterm()
    const editorFocusCallbackRef = useRef<() => void>()

    const { addModule, run: run_python } = usePython({
        stdout: write,
        stdin: read,
    })

    const run_current_code = async () => {
        setRunning(true)
        clear()
        focus() // focus on the terminal
        await run_python!(createDewyRunner(source))
        setRunning(false)
        editorFocusCallbackRef.current?.() // focus back on the code editor
    }

    // initialize dewy modules and entry point
    useEffect(() => {
        if (addModule === undefined || run_python == undefined) return
        ;(async () => {
            for (const mod of dewy_interpreter_source) {
                await addModule(mod)
            }
            setReady(true)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addModule, run_python])

    return (
        <>
            <div className="relative flex flex-col gap-4">
                <CodeEditor
                    className="w-full bg-[#232323] text-xl md:text-lg"
                    text={source}
                    setText={setSource}
                    language={dewy_lang()}
                    theme={dewy_theme}
                    readonly={running}
                    keyListener={async (keys, event) => {
                        if (keys.length === 2 && keys.includes('Control') && keys.includes('Enter')) {
                            run_current_code()
                        }
                    }}
                    setFocusCallback={(f) => {
                        editorFocusCallbackRef.current = f
                    }}
                />
                <div>
                    <button
                        className={twMerge(
                            'font-gentona text-2xl py-2 px-4 rounded-md',
                            running ? 'bg-[#343434] text-gray-500' : 'bg-[#232323] hover:bg-[#404040] text-white',
                        )}
                        onClick={run_current_code}
                        disabled={running}
                    >
                        Run
                    </button>
                </div>

                {/* Note the terminal element needs to exist from the start, else xterm won't hook in correctly */}
                <div className="border-2 border-white rounded-md" ref={divRef} />

                {dewy_examples !== undefined && (
                    <div className="w-full">
                        <Accordion title="Working Examples">
                            {/* list of buttons, one for each example working program */}
                            <div className="flex flex-row flex-wrap gap-2">
                                {dewy_examples.good_examples.map(({ name, code }, idx) => (
                                    <button
                                        key={idx}
                                        className="font-gentona text-2xl px-4 h-[3.5em] whitespace-pre bg-[#232323] hover:bg-[#404040] text-white rounded-md"
                                        onClick={() => {
                                            clear()
                                            setSource(code)
                                        }}
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </Accordion>
                        <Accordion title="Broken Examples">
                            {/* list of buttons, one for each example broken program */}
                            <div className="flex flex-row flex-wrap gap-2">
                                {dewy_examples.bad_examples.map(({ name, code }, idx) => (
                                    <button
                                        key={idx}
                                        className="font-gentona text-2xl px-4 h-[3.5em] whitespace-pre bg-[#232323] hover:bg-[#404040] text-white rounded-md"
                                        onClick={() => {
                                            clear()
                                            setSource(code)
                                        }}
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>
                        </Accordion>
                    </div>
                )}

                {/* loading spinner over whole element while not ready */}
                {!ready && (
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center">
                        <Loading size="medium" />
                    </div>
                )}
            </div>
        </>
    )
}

export default DewyDemo
