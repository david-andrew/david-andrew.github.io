'use client'
import { useState, useEffect } from 'react'
import { useXterm } from './terminal'
import { PyModule, usePython } from '@/app/(hooks)/pyodide'
import { Loading } from '@/app/loading'

import { CodeEditor } from '@/app/(components)/syntax'
import { dewy_meta_lang, dewy_meta_theme } from '@/app/(components)/syntax_dewy_meta'
// import { dewy_lang, dewy_theme } from '@/app/(components)/syntax_dewy'

/*
[Tasks]
[x] switch to the correct code editor+terminal (probably in _dewy file?)
[x] terminal handling input request
[x] change font in terminal to monospace and correct size!
[ ] push to master

*/
//TODO: probably need to modify the print/input functions in Scope.default() to flush after every use
//TODO: may need to set stderr in pyodide to go to the terminal

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
    if res: print(res)

# run dewy source code
dewy('''${escaped_source}'''); sys.stdout.flush()
`
}

export type DewyDemoProps = {
    dewy_interpreter_source: PyModule[]
    dewy_examples: string[]
}

const DewyDemo = ({ dewy_interpreter_source, dewy_examples }: DewyDemoProps): JSX.Element => {
    const [ready, setReady] = useState(false)
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
                />
                <div>
                    <button
                        className="font-gentona text-2xl py-2 px-4 bg-[#232323] hover:bg-[#404040] text-white rounded-md"
                        onClick={() => {
                            clear()
                            run!(createDewyRunner(source))
                        }}
                    >
                        Run
                    </button>
                </div>

                {/* Note the terminal element needs to exist from the start, else xterm won't hook in correctly */}
                <div className="border-2 border-white rounded-md" ref={divRef} />

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
