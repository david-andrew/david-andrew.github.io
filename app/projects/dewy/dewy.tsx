'use client'
import { useEffect, useState } from 'react'
import { PyodideInterface, loadPyodide } from 'pyodide'

/*
Tasks:
- use importlib modification to be able to load modules from PyModules (i.e. {name, code})
- write a small main entrypoint that imports whatever function for calling the interpreter
- have some better approach for getting input from the user.
    ---> should be an input text field on the page, somehow need to route to that.
         pyodide has functions for overriding input/output
*/

export const usePyodide = () => {
    const [pyodide, setPyodide] = useState<PyodideInterface | undefined>(undefined)

    useEffect(() => {
        const initializePyodide = async () => {
            const loadedPyodide = await loadPyodide({
                indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/',
                fullStdLib: false,
            })
            console.log('Pyodide is ready to use:', loadedPyodide.version)
            setPyodide(loadedPyodide)
        }

        initializePyodide()
    }, [])

    return pyodide
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

export const Python = ({ modules = [], main }: { modules?: PyModule[]; main: string }): JSX.Element => {
    const pyodide = usePyodide()
    const [ready, setReady] = useState(false)
    const [output, setOutput] = useState<string | undefined>(undefined)
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
            await pyodide.runPythonAsync('_result = None')
            await pyodide.runPythonAsync(main)
            const result = pyodide.globals.get('_result')
            setOutput(result)
        })()
    }, [pyodide, main, ready])

    if (pyodide === undefined) return <div>Loading pyodide...</div>
    if (!ready) return <div>Loading preloads...</div>
    return <div>output: {output}</div>
}

// export default Python
import { CodeEditor } from '@/app/(components)/syntax'
import { dewy_meta_lang, dewy_meta_theme } from '@/app/(components)/syntax_dewy_meta'
const DewyDemo = ({
    dewy_interpreter_source,
    dewy_examples,
}: {
    dewy_interpreter_source: PyModule[]
    dewy_examples: string[]
}): JSX.Element => {
    const [text, setText] = useState(dewy_examples[0])

    return (
        <>
            <CodeEditor
                className="w-full bg-[#232323] text-xl md:text-lg"
                text={text}
                language={dewy_meta_lang()}
                theme={dewy_meta_theme}
            />
            <Terminal />
            {/* <Python
                modules={dewy_interpreter_source}
                main={`
from tokenizer import tokenize
from postok import post_process
from parser import top_level_parse
from dewy import Scope

def dewy(src:str):
    tokens = tokenize(src)
    post_process(tokens)

    root = Scope.default()
    ast = top_level_parse(tokens, root)
    res = ast.eval(root)
    if res: print(res)

dewy("printl'Hello from dewy!'")
`}
            /> */}
        </>
    )
}

export default DewyDemo

import { useRef } from 'react'

const Terminal = (): JSX.Element => {
    const [terminalOutput, setTerminalOutput] = useState<string[]>([])
    const [userInput, setUserInput] = useState('')
    const terminalRef = useRef<HTMLDivElement>(null)

    // Function to append text to the terminal
    const writeToTerminal = (text: string) => {
        setTerminalOutput((prev) => [...prev, text])
    }

    // Function to handle user input submission
    const handleInputSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            writeToTerminal(userInput)
            setUserInput('')
            // Optionally, resolve a promise here
        }
    }

    // Auto-scroll to the bottom
    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight
        }
    }, [terminalOutput])

    return (
        <div ref={terminalRef} className="bg-black text-white p-4 h-96 overflow-auto">
            {terminalOutput.map((line, index) => (
                <div key={index}>{line}</div>
            ))}
            <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleInputSubmit}
                className="bg-transparent text-white border-none outline-none"
            />
        </div>
    )
}
