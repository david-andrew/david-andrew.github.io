'use client'
import { useState, useEffect, useRef } from 'react'
import { makeAtomicsChannel, writeMessage } from 'sync-message'

// type UsePyodideHook = {

// }

export const usePyodide = (): [boolean, (pythonCode: string) => void] => {
    const [channel, setChannel] = useState<ReturnType<typeof makeAtomicsChannel>>()
    const [pyodideWorker, setPyodideWorker] = useState<Worker | null>(null)

    //on init create the atomics channel
    useEffect(() => {
        const channel = makeAtomicsChannel()
        console.log('created channel', channel)
        setChannel(channel)
    }, [])

    //once the channel is created, create the pyodide worker
    useEffect(() => {
        if (channel) {
            const newWorker = new Worker(new URL('./pyodideWorker.ts', import.meta.url))
            newWorker.postMessage({ channel })
            setPyodideWorker(newWorker)

            // set the onmessage handler
            newWorker.onmessage = (e: MessageEvent) => {
                console.log('received message from worker', e)
                if (e.data.messageId !== undefined) {
                    const id = e.data.messageId

                    //demo of async message returning something for stdin
                    // console.log('sending message to worker', channel, { message: 'default stdin message' }, id)
                    // writeMessage(channel, { message: 'default stdin message' }, id)
                    setTimeout(() => {
                        console.log(
                            'sending message to worker',
                            channel,
                            {
                                message:
                                    'default stdin message. <Promise>hello from network service worker</Promise> 1 second later',
                            },
                            id,
                        )
                        writeMessage(
                            channel,
                            {
                                message:
                                    'default stdun message. <Promise>hello from network service worker</Promise> 1 second later',
                            },
                            id,
                        )
                    }, 1000)
                } else if (e.data.error) {
                    console.error(e.data.error)
                } else {
                    console.log('unknown message received message from worker', e)
                }
            }
        }
    }, [channel])

    const runPython = (pythonCode: string) => {
        if (pyodideWorker) {
            // console.log('sending message to worker', pythonCode)
            pyodideWorker.postMessage({ python: pythonCode })
        } else {
            console.log('pyodide worker is null')
        }
    }

    //TODO: return some sort of status + more comprehensive interface to pyodide
    const ready = pyodideWorker !== null
    //TODO: ready should be based on when the pyodide worker says it's ready...
    return [ready, runPython]
}

export const MyComponent: React.FC = () => {
    const [pythonCode, setPythonCode] = useState<string>('print("Hello from Python!")\na = input()\nprint(a)')
    const [ready, runPython] = usePyodide()

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
            <p>Pyodide Ready: {`${ready}`}</p>
        </div>
    )
}

export default MyComponent
