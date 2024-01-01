'use client'
import { sleep } from '@/app/utils'
import { useState } from 'react'
import { usePyodide } from '@/app/(hooks)/pyodide'

export const MyComponent = (): JSX.Element => {
    const [pythonCode, setPythonCode] = useState<string>('print("Hello from Python!")\na = input()\nprint(a)')

    const stdout = (msg: string) => {
        console.log('this is stdout: ', msg)
    }
    //TODO: raw stdout with custom batching

    const stdin = async () => {
        await sleep(4000)
        return 'asynchronous input received'
    }

    const { runPython, flush } = usePyodide({ stdin, stdout })

    if (!runPython) {
        return <div>loading...</div>
    }

    return (
        <div className="flex flex-col">
            <textarea
                className="bg-gray-500 text-white"
                value={pythonCode}
                onChange={(e) => setPythonCode(e.target.value)}
            />
            <button
                onClick={() => {
                    console.log('running python code:', pythonCode)
                    runPython(pythonCode)
                    flush()
                }}
            >
                Run Python
            </button>
        </div>
    )
}

export default MyComponent
