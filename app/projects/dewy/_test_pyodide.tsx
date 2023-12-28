'use client'
import { useState, useEffect, useRef } from 'react'
import { makeServiceWorkerChannel, writeMessage } from 'sync-message'

// type UsePyodideHook = {

// }

export const usePyodide = (): [boolean, (pythonCode: string) => void] => {
    const [netService, setNetService] = useState<ServiceWorkerRegistration>()
    const [channel, setChannel] = useState<ReturnType<typeof makeServiceWorkerChannel>>()
    const [pyodideWorker, setPyodideWorker] = useState<Worker | null>(null)

    //on init, register the network service worker
    useEffect(() => {
        ;(async () => {
            const reg = await navigator.serviceWorker.register(new URL('./networkService.ts', import.meta.url))
            console.log('network service worker registration success', reg)
            setNetService(reg)
        })()
    }, [])

    //once the network service worker is registered, create the channel
    useEffect(() => {
        if (netService) {
            const channel = makeServiceWorkerChannel({ scope: netService.scope })
            setChannel(channel)
        }
    }, [netService])

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
                    console.log('sending message to worker', channel, { message: 'default stdin message' }, id)
                    writeMessage(channel, { message: 'default stdin message' }, id)
                    // setTimeout(() => {
                    //     console.log(
                    //         'sending message to worker',
                    //         channel,
                    //         { message: 'default stdin message. hello from network service worker' },
                    //         id,
                    //     )
                    //     writeMessage(
                    //         channel,
                    //         { message: 'default stdun message. hello from network service worker' },
                    //         id,
                    //     )
                    // }, 1000)
                } else if (e.data.error) {
                    console.error(e.data.error)
                } else {
                    console.log('unknown message received message from worker', e)
                }
            }
        }
    }, [channel])

    // useEffect(() => {
    //     // activate the pyodide web worker and the network service worker
    //     const newWorker = new Worker(new URL('./pyodideWorker.ts', import.meta.url))
    //     navigator.serviceWorker.register(new URL('./networkService.ts', import.meta.url)).then(
    //         (registration) => {
    //             console.log('network service worker registration success', registration)
    //         },
    //         (error) => {
    //             console.error('network service worker registration failed', error)
    //         },
    //     )

    //     //send the channel to the worker
    //     if (channelRef.current === null) {
    //         console.error('channel was null!', channelRef.current)
    //     } else {
    //         console.log('sending channel to worker', channelRef.current)
    //         newWorker.postMessage({ channel: channelRef.current })
    //     }

    //     newWorker.onmessage = (e: MessageEvent) => {
    //         console.log('received message from worker', e)
    //         if (e.data.messageId !== undefined) {
    //             const channel = channelRef.current
    //             if (channel === null) {
    //                 console.error('channel was null!', channelRef.current)
    //                 return
    //             }
    //             const id = e.data.messageId
    //             //demo of async message returning something for stdin
    //             setTimeout(() => {
    //                 console.log(
    //                     'sending message to worker',
    //                     channel,
    //                     { message: 'hello from network service worker' },
    //                     id,
    //                 )
    //                 writeMessage(channel, { message: 'hello from network service worker' }, id)
    //             }, 1000)
    //         } else if (e.data.error) {
    //             console.error(e.data.error)
    //         } else {
    //             console.log('unknown message received message from worker', e)
    //             setOutput(e.data.result)
    //         }
    //     }

    //     setWorker(newWorker)

    //     return () => newWorker.terminate()
    // }, [])

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
            <button onClick={() => runPython(pythonCode)}>Run Python</button>
            <p>Pyodide Ready: {`${ready}`}</p>
        </div>
    )
}

export default MyComponent
