'use client'
import { useState, useEffect } from 'react'

export const usePyodide = (): [(pythonCode: string) => void, string] => {
    const [worker, setWorker] = useState<Worker | null>(null)
    const [output, setOutput] = useState<string>('')

    useEffect(() => {
        const newWorker = new Worker('/pyodide/pyodideWorker.js')

        newWorker.onmessage = (e: MessageEvent) => {
            if (e.data.error) {
                console.error(e.data.error)
            } else {
                setOutput(e.data.result)
            }
        }

        setWorker(newWorker)

        return () => newWorker.terminate()
    }, [])

    const runPython = (pythonCode: string) => {
        if (worker) {
            // console.log('sending message to worker', pythonCode)
            worker.postMessage({ python: pythonCode })
        } else {
            // console.log('worker is null')
        }
    }

    return [runPython, output]
}

export const MyComponent: React.FC = () => {
    const [pythonCode, setPythonCode] = useState<string>('print("Hello from Python!")')
    const [runPython, output] = usePyodide()

    return (
        <div className="flex flex-col">
            <textarea
                className="bg-gray-500 text-white"
                value={pythonCode}
                onChange={(e) => setPythonCode(e.target.value)}
            />
            <button onClick={() => runPython(pythonCode)}>Run Python</button>
            <p>Output: {output}</p>
        </div>
    )
}

// export default MyComponent
