'use client'
import { useState, useEffect, useRef } from 'react'
import { makeAtomicsChannel, writeMessage, Channel } from 'sync-message'
import { PyodideWorker, InputRequester, RawStdout, BatchStdout } from './pyodideWorker'
import * as Comlink from 'comlink'
import { Remote } from 'comlink'
import { sleep } from '@/app/utils'

type UsePyodideProps = {
    rawStdout?: RawStdout
    batchStdout?: BatchStdout
    stdin?: () => Promise<string>
}
type UsePyodideHook = ((pythonCode: string) => Promise<void>) | undefined

export const usePyodide = ({ rawStdout, batchStdout, stdin }: UsePyodideProps): UsePyodideHook => {
    const [channel, setChannel] = useState<Channel>()
    const [ready, setReady] = useState<boolean>(false)
    const pyodideWorker = useRef<Remote<PyodideWorker>>()

    const inputRequester: InputRequester = (channel: Channel, id: string) => {
        ;(async () => {
            const message = (await stdin?.()) ?? '<no stdin function provided>'
            console.log('sending message to worker', message, id)
            writeMessage(channel, { message }, id)
        })()
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

                // set required values and callbacks
                await workerProxy.setChannel(channel)
                await workerProxy.setInputRequester(Comlink.proxy(inputRequester))
                if (rawStdout) await workerProxy.setRawStdout(Comlink.proxy(rawStdout))
                if (batchStdout) await workerProxy.setBatchStdout(Comlink.proxy(batchStdout))

                // only call after setting all the values and callbacks
                await workerProxy.initializePyodide()

                // set the workerProxy to the ref and mark ready
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

    const batchStdout = (msg: string) => {
        console.log('this is stdout: ', msg)
    }
    //TODO: raw stdout with custom batching

    const stdin = async () => {
        await sleep(4000)
        return 'asynchronous input received'
    }

    const runPython = usePyodide({ stdin, batchStdout })

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
