'use client'
import { useState, useEffect, useRef } from 'react'
import { makeAtomicsChannel, writeMessage, Channel } from 'sync-message'
import { PyodideWorker, InputRequester, RawStdout, BatchStdout } from '@/app/projects/dewy/pyodideWorker'
import * as Comlink from 'comlink'
import { Remote } from 'comlink'

type UsePyodideProps = {
    stdout?: (msg: string) => void
    stdin?: () => Promise<string>
}
type UsePyodideHook = {
    runPython: ((pythonCode: string) => Promise<void>) | undefined
    flush: () => void
}

export const usePyodide = ({
    stdout = (msg) => console.log(msg),
    stdin = async () => '<no stdin callback set>',
}: UsePyodideProps): UsePyodideHook => {
    const [channel, setChannel] = useState<Channel>()
    const [ready, setReady] = useState<boolean>(false)
    const pyodideWorker = useRef<Remote<PyodideWorker>>()

    const maxLength: number | undefined = 1024
    const bufRef = useRef<string[]>([])
    const flush = () => {
        stdout(bufRef.current.join(''))
        bufRef.current = []
    }
    const receiveChar = (c: number) => {
        const msg = String.fromCharCode(c)
        bufRef.current.push(msg)
        if ((maxLength && bufRef.current.length > maxLength) || msg === '\n') {
            flush()
        }
    }

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
                const worker = new Worker(new URL('@/app/projects/dewy/pyodideWorker.ts', import.meta.url))
                const workerProxy = Comlink.wrap<PyodideWorker>(worker)

                // set required values and callbacks
                await workerProxy.setChannel(channel)
                await workerProxy.setInputRequester(Comlink.proxy(inputRequester))
                await workerProxy.setRawStdout(Comlink.proxy(receiveChar))

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

    return { runPython, flush }
}
