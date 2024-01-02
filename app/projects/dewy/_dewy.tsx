'use client'
import { useState, useEffect } from 'react'
import { useXterm } from './terminal'
import { PyModule, usePython } from '@/app/(hooks)/pyodide'
import { Loading } from '@/app/loading'
import { Accordion } from '@/app/(components)/accordion'
import { FetchedDewySourceExamples } from './fetch_dewy'

import { CodeEditor } from '@/app/(components)/syntax'
import { dewy_meta_lang, dewy_meta_theme } from '@/app/(components)/syntax_dewy_meta'
import { twMerge } from 'tailwind-merge'
// import { dewy_lang, dewy_theme } from '@/app/(components)/syntax_dewy'

/*
[Tasks]
[x] switch to the correct code editor+terminal (probably in _dewy file?)
[x] terminal handling input request
[x] change font in terminal to monospace and correct size!
[x] merge branch to master
[ ] example program presets you can click
[ ] make run button + code editor disabled while running
[x] handling hitting pdb. probably replace pdb call with a message and exit(1)
[ ] syntax highlighting
[ ] mobile firefox never loads
[x] catching exceptions in the demo
[ ] "undefined" printed out at the end of the loop example

[ ] add `a = sin(x)^2 + cos(x)^2` to the dewy example programs (currently broken)


*/

const createDewyRunner = (src: string) => {
    const escaped_source = src.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
    return `
# turn off any printing while importing stuff
import sys
import io
_stdout = sys.stdout
_stderr = sys.stderr
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()

# silent imports
from tokenizer import tokenize
from postok import post_process
from parser import top_level_parse
from dewy import Scope, Builtin
from functools import partial

# turn printing back on
sys.stdout = _stdout
sys.stderr = _stderr

# update the builtin print function to flush after every use
Builtin.funcs = {
    'print': partial(print, end='', flush=True),
    'printl': partial(print, flush=True),
    'readl': input
}

# define main entry point
def dewy(src:str):
    tokens = tokenize(src)
    post_process(tokens)

    root = Scope.default()
    ast = top_level_parse(tokens, root)
    res = ast.eval(root)
    # if res: print(res) #causes weird behavior in most cases

# replace pdb.set_trace with a message and exit(1)
import pdb
def pdb_set_trace():
    print('ERROR: encountered syntax which is not yet implemented. exiting.', flush=True)
    exit(1)
pdb.set_trace = pdb_set_trace

# run dewy source code
try:
    dewy('''${escaped_source}'''); sys.stdout.flush()
except:
    print('ERROR: encountered syntax which is not yet implemented. exiting.', flush=True)
`
}

export type DewyDemoProps = {
    dewy_interpreter_source: PyModule[]
    dewy_examples: FetchedDewySourceExamples
}

const DewyDemo = ({ dewy_interpreter_source, dewy_examples }: DewyDemoProps): JSX.Element => {
    const [ready, setReady] = useState(false)
    const [running, setRunning] = useState(false)
    const [source, setSource] = useState("print'what is your name? '\nname = readl\nprintl'Hello {name}'")

    const { divRef, write, read, clear } = useXterm()

    const { addModule, run } = usePython({
        stdout: write,
        stdin: read,
    })

    // initialize dewy modules and entry point
    useEffect(() => {
        if (addModule === undefined || run == undefined) return
        ;(async () => {
            for (const mod of dewy_interpreter_source) {
                await addModule(mod)
                console.log('added python module:', mod.name)
            }
            setReady(true)
        })()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addModule, run])

    return (
        <>
            <div className="relative flex flex-col gap-4">
                <CodeEditor
                    className="w-full bg-[#232323] text-xl md:text-lg"
                    text={source}
                    setText={setSource}
                    language={dewy_meta_lang()}
                    theme={dewy_meta_theme}
                    readonly={running}
                />
                <div>
                    <button
                        className={twMerge(
                            'font-gentona text-2xl py-2 px-4 rounded-md',
                            running ? 'bg-[#343434] text-gray-500' : 'bg-[#232323] hover:bg-[#404040] text-white',
                        )}
                        onClick={async () => {
                            setRunning(true)
                            clear()
                            await run!(createDewyRunner(source))
                            setRunning(false)
                        }}
                        disabled={running}
                    >
                        Run
                    </button>
                </div>

                {/* Note the terminal element needs to exist from the start, else xterm won't hook in correctly */}
                <div className="border-2 border-white rounded-md" ref={divRef} />

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
