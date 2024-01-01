'use client'
import { useState } from 'react'
import { useXterm } from './terminal'
import { PyModule, usePython } from '@/app/(hooks)/pyodide'

import { CodeEditor } from '@/app/(components)/syntax'
import { dewy_meta_lang, dewy_meta_theme } from '@/app/(components)/syntax_dewy_meta'
// import { dewy_lang, dewy_theme } from '@/app/(components)/syntax_dewy'

export type DewyDemoProps = {
    dewy_interpreter_source: PyModule[]
    dewy_examples: string[]
}

const DewyDemo = ({ dewy_interpreter_source, dewy_examples }: DewyDemoProps): JSX.Element => {
    const [text, setText] = useState("printl'Hello from Dewy!'")
    const [count, setCount] = useState(0)
    const [source, setSource] = useState(text)
    const escaped_source = source.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

    //handling input:
    // onInput passed to xterm. writes to a buffer
    // when stdin() is called from python:
    // 1. clear buffer
    // 2. listen to buffer until a newline is encountered
    // 3. terminal output needs to be adjusted to show the input as it is typed

    const { divRef, write, read } = useXterm()

    const { state } = usePython({
        stdout: (m: string) => console.log(m), //write,
        stdin: read,
        modules: dewy_interpreter_source,
        main: `
# run count = ${count}. This line re-runs the interpreter every time the run button is clicked.

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

# replace input with an async version provided by javascript
from js_input import js_input
import asyncio
def new_input(prompt=''):
    print(prompt, end='', flush=True)
    loop = asyncio.get_event_loop()
    asyncio.set_event_loop(loop)
    result = loop.run_until_complete(js_input())
    #loop.close()
    return result


#todo make all python input calls use this new input
Builtin.funcs['readl'] = new_input

# test input
#print('input test', flush=True)
#print(new_input('enter something: '))
#print('end input test')

def dewy(src:str):
    tokens = tokenize(src)
    post_process(tokens)

    root = Scope.default()
    ast = top_level_parse(tokens, root)
    res = ast.eval(root)
    if res: print(res)

dewy('''${escaped_source}''')
sys.stdout.flush()

#from myjsmodule import myread, asyncread
#print(myread())
#
##await the async function
#print(await asyncread())
`,
    })

    return (
        <>
            <CodeEditor
                className="w-full bg-[#232323] text-xl md:text-lg"
                text={text}
                setText={setText}
                language={dewy_meta_lang()}
                theme={dewy_meta_theme}
            />
            <button
                className="font-gentona text-2xl py-2 px-4 bg-[#232323] hover:bg-[#404040] text-white rounded-md"
                onClick={() => {
                    setCount((c) => c + 1)
                    setSource(text)
                }}
            >
                Run
            </button>
            {(() => {
                if (state === 'loadingPyodide') {
                    return <div>Loading pyodide...</div>
                } else if (state === 'loadingPreloads') {
                    return <div>Loading preloads...</div>
                }
                return <div>Running</div>
            })()}

            <div ref={divRef} />
        </>
    )
}

export default DewyDemo
