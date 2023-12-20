'use client'
import { useEffect, useState } from 'react'
import { PyodideInterface, loadPyodide } from 'pyodide'

/*
Tasks:
- use importlib modification to be able to load modules from PyModules (i.e. {name, code})
- when importing a file, figure out how to ignore any if __name__ == '__main__' blocks
    ---> possibly just modify the condition to be false (e.g. replace with if False:, etc.)
- write a small main entrypoint that imports whatever function for calling the interpreter
- have some better approach for getting input from the user.
    ---> should be an input text field on the page, somehow need to route to that.
         possibly override python's input() function
         or see if there's a way to direct pyodide when input is called
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

export const Python = ({ modules = [], main }: { modules?: PyModule[]; main: string }): JSX.Element => {
    const pyodide = usePyodide()
    const [ready, setReady] = useState(false)
    const [output, setOutput] = useState<string | undefined>(undefined)
    useEffect(() => {
        if (pyodide === undefined) return
        ;(async () => {
            await pyodide.runPythonAsync('_result = None')
            for (const module of modules) {
                await pyodide.runPythonAsync(module.code)
            }
            setReady(true)
        })()
    }, [pyodide])

    useEffect(() => {
        if (pyodide === undefined || !ready) return
        ;(async () => {
            await pyodide.runPythonAsync(main)
            const result = pyodide.globals.get('_result')
            setOutput(result)
        })()
    }, [pyodide, main, ready])

    if (pyodide === undefined) return <div>Loading pyodide...</div>
    if (!ready) return <div>Loading preloads...</div>
    return <div>output: {output}</div>
}

export default Python

// const useDewy = () => {
//     const [ready, setReady] = useState(false)
//     const pyodide = usePyodide()
//     useEffect(() => {
//         ;(async () => {
//             if (pyodide === undefined) return
//             // await pyodide.runPythonAsync(dewy)
//         })()
//     }, [pyodide])
// }

// export const Test = (): JSX.Element => {
//     const [count, setCount] = useState(0)
//     const pyodide = usePyodide()
//     // useEffect(() => {
//     //     if (pyodide === undefined) return
//     //     if (count === 1) {
//     //         pyodide.runPythonAsync(program1).then((result) => {
//     //             console.log(result)
//     //         })
//     //     }
//     //     if (count === 2) {
//     //         pyodide.runPythonAsync(program2).then((result) => {
//     //             console.log(result)
//     //         })
//     //     }
//     // }, [count, pyodide])

//     return (
//         <>
//             <button onClick={() => setCount((c) => c + 1)}>Start {count}</button>
//         </>
//     )
// }

// export default Test
