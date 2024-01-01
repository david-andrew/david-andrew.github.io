import { uuidv4, readMessage, Channel } from 'sync-message'
import { loadPyodide as fetchPyodide, PyodideInterface } from 'pyodide'
import { expose } from 'comlink'

export type InputRequester = (channel: Channel, id: string) => void
export type PyodideWorker = {
    setChannel: (channel: Channel) => void
    setInputRequester: (inputRequester: InputRequester) => void
    initializePyodide: () => Promise<void>
    runPython: (code: string) => Promise<string>
}

// export class PyodideWorker {
let _pyodide: PyodideInterface | undefined
let _channel: Channel | undefined
let _inputRequester: InputRequester | undefined

const setChannel = (channel: Channel) => {
    console.log('received channel in worker', channel)
    _channel = channel
}

const setInputRequester = (inputRequester: InputRequester) => {
    console.log('received inputRequester in worker', inputRequester)
    _inputRequester = inputRequester
}

const initializePyodide = async () => {
    console.log('starting to load pyodide...')
    _pyodide = await fetchPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/',
    })
    console.log('done loading pyodide...')
    _pyodide.setStdout({
        batched: (text) => {
            console.log('stdout from pyodide', text)
            // self.postMessage({ stdout: text })
        },
    })
    _pyodide.setStdin({
        stdin: () => {
            if (!_channel) {
                return '<failed to read from stdin. no channel available>'
            }
            if (!_inputRequester) {
                return '<failed to read from stdin. no inputRequester available>'
            }
            const messageId = uuidv4()
            // postMessage({ messageId })
            _inputRequester(_channel, messageId)
            console.log('pyodide trying to read from stdin. waiting for message id', messageId)
            const { message } = readMessage(_channel, messageId)
            // console.log('from stdin message:', message)
            return message
        },
    })
}

const runPython = async (code: string) => {
    console.log('in web worker, trying to run code: ', code)
    if (!_pyodide) {
        console.error('pyodide not loaded yet')
        return
    }
    try {
        let result = await _pyodide.runPythonAsync(code)
        return result
    } catch (error: any) {
        return error.message
    }
}

const pyodideWorker: PyodideWorker = {
    setChannel,
    setInputRequester,
    initializePyodide,
    runPython,
}

expose(pyodideWorker)
