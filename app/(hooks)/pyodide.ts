'use client'
import { useState, useEffect, useRef } from 'react'
import { writeMessage, Channel, makeServiceWorkerChannel } from 'sync-message'
import { PyodideWorker, InputRequester } from '@/app/projects/dewy/pyodideWorker'
import * as Comlink from 'comlink'
import { Remote } from 'comlink'

type UsePyodideProps = {
    stdout?: (msg: string) => void
    stdin?: () => Promise<string>
}
type UsePyodideHook = {
    runPython: ((pythonCode: string) => Promise<void>) | undefined
}

export const usePyodide = ({
    stdout = (msg) => console.log(msg),
    stdin = async () => '<no stdin callback set>',
}: UsePyodideProps): UsePyodideHook => {
    const [channel, setChannel] = useState<Channel>()
    const serviceUnsupportedRef = useRef<true | undefined>()
    const [ready, setReady] = useState<boolean>(false)
    const pyodideWorker = useRef<Remote<PyodideWorker>>()

    // unbuffered input handling for stdout
    const receiveChar = (c: number) => {
        stdout(String.fromCharCode(c))
    }

    // function for requesting input from the app asynchonously, and passing it to the worker
    const inputRequester: InputRequester = (channel: Channel, id: string) => {
        ;(async () => {
            const message = (await stdin?.()) ?? '<no stdin function provided>'
            // console.log('sending message to worker', message, id)
            writeMessage(channel, { message }, id)
        })()
    }

    //on init, try to create the atomics channel
    useEffect(() => {
        // check if service workers are supported
        if (!('serviceWorker' in navigator)) {
            console.error('service workers not supported. Falling back to prompt() io')
            serviceUnsupportedRef.current = true
        }
        const channel = makeServiceWorkerChannel({ scope: '_next/static/chunks/' })
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
                await workerProxy.setRawStdout(Comlink.proxy(receiveChar))

                // set input handler only if service workers are supported
                if (serviceUnsupportedRef.current === undefined) {
                    await workerProxy.setInputRequester(Comlink.proxy(inputRequester))
                }

                // only call after setting all the values and callbacks
                await workerProxy.initializePyodide()

                // save the workerProxy to the ref and mark ready
                pyodideWorker.current = workerProxy
                setReady(true)
            })()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [channel])

    const runPython = ready
        ? async (pythonCode: string) => {
              await pyodideWorker.current!.runPython(pythonCode)
          }
        : undefined

    return { runPython }
}

export type PyModule = {
    name: string
    code: string
}

// python for loading modules from strings in pyodide
const module_loader_py = `
import importlib.abc
import importlib.machinery
import sys

# Simulated file contents
file_contents: dict[str,str] = {}

# Register a file
def register_file(name, code):
    file_contents[name] = code

# Custom module loader
class StringLoader(importlib.abc.Loader):
    def __init__(self, name, code):
        self.name = name
        self.code = code

    def get_source(self, fullname):
        return self.code

    def get_filename(self, fullname):
        return '<string_loader: {}>'.format(fullname)

    def is_package(self, fullname):
        return False

    def exec_module(self, module):
        exec(compile(self.get_source(module.__name__), self.get_filename(module.__name__), 'exec'), module.__dict__)

# Custom module finder
class StringFinder(importlib.abc.MetaPathFinder):
    def find_spec(self, fullname, path, target=None):
        if fullname in file_contents:
            return importlib.machinery.ModuleSpec(fullname, StringLoader(fullname, file_contents[fullname]), is_package=False)
        return None

# Install the custom finder
sys.meta_path.insert(0, StringFinder())
`

type UsePythonProps = {
    stdin?: () => Promise<string>
    stdout?: (msg: string) => void
    // stderr?: (msg: string) => void
}

type UsePythonHook =
    | {
          addModule: (module: PyModule) => Promise<void>
          run: (code: string) => Promise<void>
      }
    | {
          addModule: undefined
          run: undefined
      }

export const usePython = ({ stdout, stdin }: UsePythonProps): UsePythonHook => {
    const { runPython } = usePyodide({ stdout, stdin })
    const [ready, setReady] = useState(false)

    // create the module loader
    useEffect(() => {
        if (runPython === undefined) return
        ;(async () => {
            await runPython(module_loader_py)
            setReady(true)
        })()
    }, [runPython])

    if (!ready) return { addModule: undefined, run: undefined }

    const addModule = async (module: PyModule) => {
        //escape module code (quotes, newlines, etc.)
        const code = module.code.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
        await runPython!(`register_file('${module.name}', '''${code}''')`)
    }
    const run = async (code: string) => {
        await runPython!(code)
    }

    return { addModule, run }
}
