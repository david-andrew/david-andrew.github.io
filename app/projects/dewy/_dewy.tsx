'use client'
import { useState, useEffect } from 'react'
import { useXterm } from './terminal'
import { PyModule, usePython } from '@/app/(hooks)/pyodide'

import { CodeEditor } from '@/app/(components)/syntax'
import { dewy_meta_lang, dewy_meta_theme } from '@/app/(components)/syntax_dewy_meta'
// import { dewy_lang, dewy_theme } from '@/app/(components)/syntax_dewy'

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

# turn printing back on
sys.stdout = _stdout
sys.stderr = _stderr

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
    const [source, setSource] = useState("printl'Hello from Dewy!'")

    //handling input:
    // onInput passed to xterm. writes to a buffer
    // when stdin() is called from python:
    // 1. clear buffer
    // 2. listen to buffer until a newline is encountered
    // 3. terminal output needs to be adjusted to show the input as it is typed

    const { divRef, write, read } = useXterm()

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

    if (!ready) {
        return <div>Loading Demo...</div>
    }

    return (
        <>
            <CodeEditor
                className="w-full bg-[#232323] text-xl md:text-lg"
                text={source}
                setText={setSource}
                language={dewy_meta_lang()}
                theme={dewy_meta_theme}
            />
            <button
                className="font-gentona text-2xl py-2 px-4 bg-[#232323] hover:bg-[#404040] text-white rounded-md"
                onClick={() => {
                    run!(createDewyRunner(source))
                }}
            >
                Run
            </button>
            <div ref={divRef} />
        </>
    )
}

export default DewyDemo
