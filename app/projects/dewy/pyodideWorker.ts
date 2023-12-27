import { uuidv4 } from 'sync-message'
import { loadPyodide, PyodideInterface } from 'pyodide'


let pyodide: PyodideInterface | undefined

async function loadPyodideAndPackages() {
    pyodide = await loadPyodide(
        {
            indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/',
        }
    )
}

loadPyodideAndPackages()

self.onmessage = async (e) => {
    if (!pyodide) {
        return
    }
    pyodide.setStdout({
        batched: (text) => {
            console.log('from pyodide', uuidv4(), text)
            // self.postMessage({ stdout: text })
        },
    })

    try {
        let { python } = e.data
        let result = await pyodide.runPythonAsync(python)
        self.postMessage({ result })
    } catch (error: any) {
        self.postMessage({ error: error.message })
    }
}
