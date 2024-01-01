'use client'
import { useState, useEffect, useRef } from 'react'
import { makeAtomicsChannel, writeMessage, Channel } from 'sync-message'
import { PyodideWorker, InputRequester } from './pyodideWorker'
import * as Comlink from 'comlink'
import { Remote } from 'comlink'

export const usePyodide = (): ((pythonCode: string) => Promise<void>) | undefined => {
    const [channel, setChannel] = useState<ReturnType<typeof makeAtomicsChannel>>()
    const [ready, setReady] = useState<boolean>(false)
    const pyodideWorker = useRef<Remote<PyodideWorker>>()

    const inputRequester: InputRequester = (channel: Channel, id: string) => {
        setTimeout(() => {
            const m = {
                message: '<Promise>hello from network service worker</Promise> 1 second later',
            }
            console.log('sending message to worker', m, id)
            writeMessage(channel, m, id)
        }, 1000)
    }

    //on init create the atomics channel
    useEffect(() => {
        //TODO: try catch around this for if browser doesn't support?
        const channel = makeAtomicsChannel()
        setChannel(channel)
    }, [])

    // once the channel is created, create the pyodide worker
    useEffect(() => {
        if (channel) {
            ;(async () => {
                const worker = new Worker(new URL('./pyodideWorker.ts', import.meta.url))
                const workerProxy = Comlink.wrap<PyodideWorker>(worker)
                await workerProxy.setChannel(channel)
                await workerProxy.setInputRequester(Comlink.proxy(inputRequester))
                await workerProxy.initializePyodide()
                pyodideWorker.current = workerProxy
                setReady(true)
            })()
        }
    }, [channel])

    const runPython = ready
        ? async (pythonCode: string) => {
              await pyodideWorker.current?.runPython(pythonCode)
          }
        : undefined

    return runPython
}

export const MyComponent = (): JSX.Element => {
    const [pythonCode, setPythonCode] = useState<string>('print("Hello from Python!")\na = input()\nprint(a)')
    const runPython = usePyodide()

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
                }}
            >
                Run Python
            </button>
        </div>
    )
}

export default MyComponent
