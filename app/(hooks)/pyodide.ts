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
// properly handles module path imports (e.g. from ..mod import func)
const module_loader_py = `
from importlib.abc import Loader, MetaPathFinder
from importlib.machinery import ModuleSpec
import sys
from types import ModuleType

# Simulated file contents
source_map: dict[str, str] = {}

# Register a file
def register_file(name: str, code: str):
    source_map[name] = code

# Custom module finder
class StringFinder(MetaPathFinder):
    def find_spec(self, fullname: str, path, target=None):
        spec = self._find_py_file_spec(fullname)
        if spec is not None:
            return spec

        spec = self._find_package_init_spec(fullname)
        if spec is not None:
            return spec

        return None

    def _find_py_file_spec(self, fullname: str):
        route = f"{fullname.replace('.', '/')}.py"
        source = source_map.get(route)
        if source is None:
            return None
        loader = StringLoader(fullname, source, route)
        modspec = ModuleSpec(fullname, loader, origin=route)
        return modspec #ModuleSpec(fullname, loader, origin=route)

    def _find_package_init_spec(self, fullname: str):
        route = f"{fullname.replace('.', '/')}/__init__.py"
        source = source_map.get(route)
        if source is None:
            return None
        loader = StringLoader(fullname, source, route)
        spec = ModuleSpec(fullname, loader, origin=route, is_package=True)
        return spec

# Custom module loader
class StringLoader(Loader):
    def __init__(self, fullname, source_code, route):
        self.fullname = fullname
        self.source_code = source_code
        self.route = route

    def create_module(self, spec):
        module = sys.modules.get(spec.name)
        if module is None:
            module = ModuleType(spec.name)
            sys.modules[spec.name] = module
        return module

    def get_source(self, name):
        return self.source_code

    def get_filename(self, fullname):
        return f'<string_loader: {fullname}>'

    def is_package(self, fullname):
        return self.route.endswith('__init__.py')

    def exec_module(self, module):
        module.__file__ = self.route
        exec(compile(self.source_code, self.route, 'exec'), module.__dict__)
        return module

sys.meta_path.append(StringFinder())
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
