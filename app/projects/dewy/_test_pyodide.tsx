'use client'
import { useState, useEffect, useRef } from 'react'
import { makeChannel, writeMessage } from 'sync-message'

export const usePyodide = (): [(pythonCode: string) => void, string] => {
    const [worker, setWorker] = useState<Worker | null>(null)
    const [output, setOutput] = useState<string>('')
    const channelRef = useRef(makeChannel())

    useEffect(() => {
        // activate the pyodide web worker and the network service worker
        const newWorker = new Worker(new URL('./pyodideWorker.ts', import.meta.url))
        navigator.serviceWorker.register(new URL('./networkService.ts', import.meta.url)).then(
            (registration) => {
                console.log('network service worker registration success', registration)
            },
            (error) => {
                console.error('network service worker registration failed', error)
            },
        )

        //send the channel to the worker
        if (channelRef.current === null) {
            console.error('channel was null!', channelRef.current)
        } else {
            console.log('sending channel to worker', channelRef.current)
            newWorker.postMessage({ channel: channelRef.current })
        }

        newWorker.onmessage = (e: MessageEvent) => {
            console.log('received message from worker', e)
            if (e.data.messageId !== undefined) {
                const channel = channelRef.current
                if (channel === null) {
                    console.error('channel was null!', channelRef.current)
                    return
                }
                const id = e.data.messageId
                //demo of async message returning something for stdin
                setTimeout(() => {
                    console.log(
                        'sending message to worker',
                        channel,
                        { message: 'hello from network service worker' },
                        id,
                    )
                    writeMessage(channel, { message: 'hello from network service worker' }, id)
                }, 1000)
            } else if (e.data.error) {
                console.error(e.data.error)
            } else {
                console.log('unknown message received message from worker', e)
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
    const [pythonCode, setPythonCode] = useState<string>('print("Hello from Python!")\na = input()\nprint(a)')
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

export default MyComponent
