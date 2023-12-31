import { uuidv4, readMessage, Channel } from 'sync-message'
import { loadPyodide, PyodideInterface } from 'pyodide'

let pyodide: PyodideInterface | undefined
let channel: Channel | undefined

async function loadPyodideAndPackages() {
    console.log('starting to load pyodide...')
    pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/',
    })
    console.log('done loading pyodide...')
    pyodide.setStdout({
        batched: (text) => {
            console.log('stdout from pyodide', text)
            // self.postMessage({ stdout: text })
        },
    })
    pyodide.setStdin({
        stdin: () => {
            // return (prompt('Program is requesting user input:') ?? '') + '\n'
            if (!channel) { return '<failed to read from stdin. no channel available>' }
            const messageId = uuidv4()
            postMessage({ messageId })
            console.log('pyodide trying to read from stdin. waiting for message id', messageId)
            const _message = readMessage(channel, messageId)
            console.log('from stdin message:', _message)
            const {message} = _message
            return message
        },
    })
}

loadPyodideAndPackages()

onmessage = async (e) => {
    console.log('worker received message', e.data)
    if (e.data === undefined) return

    if (e.data.python !== undefined) {
        if (!pyodide) {
            console.error('pyodide not loaded yet')
            return
        }
        try {
            let { python } = e.data
            let result = await pyodide.runPythonAsync(python)
            postMessage({ result })
        } catch (error: any) {
            postMessage({ error: error.message })
        }
    } else if (e.data.channel !== undefined) {
        console.log('received channel', e.data.channel)
        channel = e.data.channel
    }
}
