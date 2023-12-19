'use client'
import { useEffect, useState } from 'react'
import { PyodideInterface, loadPyodide } from 'pyodide'

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

export const Python = ({ preloads = [], code }: { preloads?: string[]; code: string }): JSX.Element => {
    const pyodide = usePyodide()
    const [ready, setReady] = useState(false)
    const [output, setOutput] = useState<string | undefined>(undefined)
    useEffect(() => {
        if (pyodide === undefined) return
        ;(async () => {
            await pyodide.runPythonAsync('_result = None')
            for (const preload of preloads) {
                await pyodide.runPythonAsync(preload)
            }
            setReady(true)
        })()
    }, [pyodide])

    useEffect(() => {
        if (pyodide === undefined || !ready) return
        ;(async () => {
            await pyodide.runPythonAsync(code)
            const result = pyodide.globals.get('_result')
            setOutput(result)
        })()
    }, [pyodide, code, ready])

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
