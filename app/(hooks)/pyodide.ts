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
    // modules?: PyModule[]
    // main: string
    stdin?: () => Promise<string>
    stdout?: (msg: string) => void
    // stderr?: (msg: string) => void
}

// type PythonHookState = 'loadingPyodide' | 'loadingPreloads' | 'running' //| 'error' | pdb? | 'done'
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
    const { runPython, flush } = usePyodide({ stdout, stdin })
    const [ready, setReady] = useState(false)

    // create the module loader
    useEffect(() => {
        if (runPython === undefined) return
        ;(async () => {
            await runPython(module_loader_py)
            setReady(true)

            // for (const mod of modules) {
            //     //escape module code (quotes, newlines, etc.)
            //     const code = mod.code.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
            //     await runPython(`register_file('${mod.name}', '''${code}''')`)
            // }
        })()
    }, [runPython])

    if (!ready) return { addModule: undefined, run: undefined }

    const addModule = async (module: PyModule) => {
        //escape module code (quotes, newlines, etc.)
        const code = module.code.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
        await runPython!(`register_file('${module.name}', '''${code}''')`)
    }
    const run = async (code: string) => {
        console.log('running python code from usePython:', code)
        await runPython!(code)
        flush()
    }

    return { addModule, run }

    // // run the main code
    // useEffect(() => {
    //     if (runPython === undefined || !ready) return
    //     ;(async () => {
    //         await runPython(main)
    //         flush()
    //     })()
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [runPython, main, ready])

    // if (runPython === undefined) return { state: 'loadingPyodide' }
    // if (!ready) return { state: 'loadingPreloads' }
    // return { state: 'running' }
}
