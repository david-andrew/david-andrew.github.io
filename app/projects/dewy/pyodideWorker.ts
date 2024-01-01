import { uuidv4, readMessage, Channel } from 'sync-message'
import { loadPyodide as fetchPyodide, PyodideInterface } from 'pyodide'
import { expose } from 'comlink'

export type InputRequester = (channel: Channel, id: string) => void
export type RawStdout = (char: number) => void
export type BatchStdout = (text: string) => void
export type PyodideWorker = {
    setChannel: (channel: Channel) => void
    setInputRequester: (inputRequester: InputRequester) => void
    setRawStdout: (rawStdout: RawStdout) => void
    setBatchStdout: (batchStdout: BatchStdout) => void
    initializePyodide: () => Promise<void>
    runPython: (code: string) => Promise<string>
}

let _pyodide: PyodideInterface | undefined
let _channel: Channel | undefined
let _inputRequester: InputRequester | undefined
let _rawStdout: RawStdout | undefined
let _batchStdout: BatchStdout | undefined

const setChannel = (channel: Channel) => {
    console.log('received channel in worker', channel)
    _channel = channel
}

const setInputRequester = (inputRequester: InputRequester) => {
    console.log('received inputRequester in worker', inputRequester)
    _inputRequester = inputRequester
}

const setRawStdout = (rawStdout: RawStdout) => {
    console.log('received rawStdout in worker', rawStdout)
    _rawStdout = rawStdout
}

const setBatchStdout = (batchStdout: BatchStdout) => {
    console.log('received batchStdout in worker', batchStdout)
    _batchStdout = batchStdout
}

const initializePyodide = async () => {
    if (!_channel) {
        console.error('failed pyodide initialization. channel not set yet')
        return
    }
    if (!_inputRequester) {
        console.error('failed pyodide initialization. inputRequester not set yet')
        return
    }
    if (!_rawStdout && !_batchStdout) {
        console.error('failed pyodide initialization. stdout not set yet')
        return
    }

    console.log('starting to load pyodide...')
    _pyodide = await fetchPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.23.4/full/',
    })
    console.log('done loading pyodide...')

    // set up stdout
    if (_rawStdout !== undefined) {
        _pyodide.setStdout({
            raw: (char: number) => {
                _rawStdout!(char)
            },
        })
    } else {
        _pyodide.setStdout({
            batched: (text) => {
                _batchStdout!(text)
            },
        })
    }

    // set up stdin
    _pyodide.setStdin({
        stdin: () => {
            const messageId = uuidv4()
            // postMessage({ messageId })
            _inputRequester!(_channel!, messageId)
            console.log('pyodide trying to read from stdin. waiting for message id', messageId)
            const { message } = readMessage(_channel!, messageId)
            // console.log('from stdin message:', message)
            return message
        },
    })

    // set stderr to be the console.error
    _pyodide.setStderr({
        batched: (text) => {
            console.error(text)
        },
    })
}

const runPython = async (code: string) => {
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
    setRawStdout,
    setBatchStdout,
    initializePyodide,
    runPython,
}

expose(pyodideWorker)
