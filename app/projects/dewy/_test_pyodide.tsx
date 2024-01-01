'use client'
import { sleep } from '@/app/utils'
import { useEffect, useState } from 'react'
import { usePyodide, usePython, PyModule } from '@/app/(hooks)/pyodide'

const dewySetup = `
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
`

const embedDewyInPython = (src: string) => {
    const escaped_source = src.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
    return `dewy('''${escaped_source}'''); sys.stdout.flush()`
}

// const getCode = (count: number) => `# run ${count}\n${codeTemplate}`

export type DewyDemoProps = {
    dewy_interpreter_source: PyModule[]
    dewy_examples: string[]
}

export const MyComponent = ({ dewy_interpreter_source, dewy_examples }: DewyDemoProps): JSX.Element => {
    // const [count, setCount] = useState(0)
    // const [pythonCode, setPythonCode] = useState<string>(getCode(count))
    // const pythonCode = getCode(count)
    const [ready, setReady] = useState(false)
    const [dewyCode, setDewyCode] = useState(dewy_examples[0])

    const stdout = (msg: string) => {
        console.log('this is stdout from test MyComponent: ', msg)
    }

    const stdin = async () => {
        await sleep(4000)
        return 'asynchronous input received'
    }

    // const { runPython, flush } = usePyodide({ stdin, stdout })
    const { addModule, run } = usePython({ stdin, stdout })

    // initialize dewy modules and entry point
    useEffect(() => {
        if (addModule === undefined || run == undefined) return
        ;(async () => {
            for (const module of dewy_interpreter_source) {
                await addModule(module)
                console.log('added module:', module.name)
            }
            await run(dewySetup)
            setReady(true)
        })()
    }, [addModule, run])

    if (!ready) {
        return <div>loading pyodide...</div>
    }

    return (
        <div className="flex flex-col">
            <textarea
                className="bg-gray-500 text-white"
                value={dewyCode}
                onChange={(e) => setDewyCode(e.target.value)}
            />
            <button
                onClick={() => {
                    if (run === undefined) return
                    run(embedDewyInPython(dewyCode))
                }}
            >
                Run Python
            </button>
        </div>
    )
}

export default MyComponent
