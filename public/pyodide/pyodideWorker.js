importScripts('https://cdn.jsdelivr.net/pyodide/v0.23.4/full/pyodide.js')

// let pyodideReady = false
let pyodide

// declare pyodide on the self object
// declare const self: { pyodide: PyodideInterface };

async function loadPyodideAndPackages() {
    pyodide = await loadPyodide()
}

loadPyodideAndPackages()

self.onmessage = async (e) => {
    if (!pyodide) {
        return
    }
    pyodide.setStdout({
        batched: (text) => {
            console.log('from pyodide', text)
            // self.postMessage({ stdout: text })
        },
    })

    try {
        let { python } = e.data
        let result = await pyodide.runPythonAsync(python)
        self.postMessage({ result })
    } catch (error) {
        self.postMessage({ error: error.message })
    }
}
