'use client'
import { useEffect, useRef, useState } from 'react'
import { PyodideInterface, loadPyodide } from 'pyodide'
import { useXterm } from './terminal'

class BufferedOutput {
    private buffer: string[] = []
    private write: (msg: string) => void
    maxLength?: number

    constructor(write: (msg: string) => void, maxLength?: number) {
        this.write = write
        this.maxLength = maxLength
    }

    receiveChar(c: number) {
        const msg = String.fromCharCode(c)
        this.buffer.push(msg)
        if ((this.maxLength && this.buffer.length > this.maxLength) || msg === '\n') {
            this.flush()
        }
    }

    flush() {
        this.write(this.buffer.join(''))
        this.buffer = []
    }

    clear() {
        this.buffer = []
    }
}

type UsePyodideProps = {
    stdout?: (msg: string) => void
}

type UsePyodideHook = {
    pyodide: PyodideInterface | undefined
    flush: () => void
}

export const usePyodide = ({ stdout = (m: string) => {} }: UsePyodideProps): UsePyodideHook => {
    const [pyodide, setPyodide] = useState<PyodideInterface | undefined>(undefined)
    const bufRef = useRef<BufferedOutput>(new BufferedOutput(stdout, 1024))
    const receiveChar = bufRef.current.receiveChar.bind(bufRef.current)
    const flush = bufRef.current.flush.bind(bufRef.current)

    useEffect(() => {
        const initializePyodide = async () => {
            const loadedPyodide = await loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/',
                fullStdLib: false,
                stdin: () => {
                    return prompt('this is a custom prompt') ?? ''
                },
                stderr: (msg: string) => {
                    console.log('this is stderr: ', msg)
                },
            })
            loadedPyodide.setStdout({
                raw: receiveChar,
            })
            console.log('Pyodide is ready to use:', loadedPyodide.version)
            setPyodide(loadedPyodide)
        }

        initializePyodide()
    }, [])

    return { pyodide, flush }
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
    modules?: PyModule[]
    main: string
    // stdin?: () => string
    stdout?: (msg: string) => void
    // stderr?: (msg: string) => void
}

type PythonHookState = 'loadingPyodide' | 'loadingPreloads' | 'running' //| 'error' | pdb? | 'done'
type UsePythonHook = {
    state: PythonHookState
}

export const usePython = ({ modules = [], main, stdout }: UsePythonProps): UsePythonHook => {
    const { pyodide, flush } = usePyodide({ stdout })
    const [ready, setReady] = useState(false)
    useEffect(() => {
        if (pyodide === undefined) return
        ;(async () => {
            await pyodide.runPythonAsync(module_loader_py)
            for (const module of modules) {
                //escape module code (quotes, newlines, etc.)
                const code = module.code.replace(/\\/g, '\\\\').replace(/'/g, "\\'") //.replace(/\n/g, '\\n')
                await pyodide.runPythonAsync(`register_file('${module.name}', '''${code}''')`)
            }
            setReady(true)
        })()
    }, [pyodide])

    useEffect(() => {
        if (pyodide === undefined || !ready) return
        ;(async () => {
            await pyodide.runPythonAsync(main)
            flush()
        })()
    }, [pyodide, main, ready])

    if (pyodide === undefined) return { state: 'loadingPyodide' }
    if (!ready) return { state: 'loadingPreloads' }
    return { state: 'running' }
}

// export default Python
import { CodeEditor } from '@/app/(components)/syntax'
import { dewy_meta_lang, dewy_meta_theme } from '@/app/(components)/syntax_dewy_meta'
// import { dewy_lang, dewy_theme } from '@/app/(components)/syntax_dewy'
const DewyDemo = ({
    dewy_interpreter_source,
    dewy_examples,
}: {
    dewy_interpreter_source: PyModule[]
    dewy_examples: string[]
}): JSX.Element => {
    const [text, setText] = useState("printl'Hello from Dewy!'")
    const [count, setCount] = useState(0)
    const [source, setSource] = useState(text)
    const escaped_source = source.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

    const { divRef, write } = useXterm()

    const { state } = usePython({
        stdout: write,
        modules: dewy_interpreter_source,
        main: `
# run count = ${count}. This line re-runs the interpreter every time the button is clicked.

# turn off any printing while importing stuff
import sys
import io
_stdout = sys.stdout
_stderr = sys.stderr
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()

# silent imports
from tokenizer import tokenize
from postok import post_process
from parser import top_level_parse
from dewy import Scope

# turn printing back on
sys.stdout = _stdout
sys.stderr = _stderr

def dewy(src:str):
    tokens = tokenize(src)
    post_process(tokens)

    root = Scope.default()
    ast = top_level_parse(tokens, root)
    res = ast.eval(root)
    if res: print(res)

dewy('''${escaped_source}''')
sys.stdout.flush()
`,
    })

    return (
        <>
            <CodeEditor
                className="w-full bg-[#232323] text-xl md:text-lg"
                text={text}
                setText={setText}
                language={dewy_meta_lang()}
                theme={dewy_meta_theme}
            />
            <button
                className="font-gentona text-2xl py-2 px-4 bg-[#232323] hover:bg-[#404040] text-white rounded-md"
                onClick={() => {
                    setCount((c) => c + 1)
                    setSource(text)
                }}
            >
                Run
            </button>
            {(() => {
                if (state === 'loadingPyodide') {
                    return <div>Loading pyodide...</div>
                } else if (state === 'loadingPreloads') {
                    return <div>Loading preloads...</div>
                }
                return <div>Running</div>
            })()}

            <div ref={divRef} />
        </>
    )
}

export default DewyDemo
