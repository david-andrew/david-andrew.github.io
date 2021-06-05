/* eslint-disable @typescript-eslint/no-var-requires */

import React, { useState } from 'react'
// this just loads stuff to load the wasm
import hello from '../../wasm/hello'

const Loaded = ({ wasm }: { wasm: any }) => (
    <button
        onClick={() => {
            // console.log('would call wasm here')
            // console.log(wasm)
            const func = wasm.cwrap('func', 'int', ['int', 'int'])
            console.log(func(1, 6))
            const func2 = wasm.cwrap('func2', 'void', ['string', 'string'])
            const str1 = 'apple'
            const str2 = 'banana'
            console.log(func2(str1, str2))
        }}
    >
        Click me
    </button>
)

const Unloaded = ({ loading, loadWasm }: { loading: boolean; loadWasm: () => void }) => {
    return loading ? <div>Loading...</div> : <button onClick={loadWasm}>Load library</button>
}

export const DewyLiveParser = () => {
    const [loading, setLoading] = useState(false)
    const [wasm, setWasm] = useState(null)
    const loadWasm = async () => {
        try {
            setLoading(true)
            const wasm = hello({
                onRuntimeInitialized: () => {
                    ;(async () => {
                        setWasm(await wasm)
                    })()
                },
                // This overrides the default path used by the wasm/hello.js wrapper
                locateFile: () => require('../../wasm/hello.wasm').default,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="App">
            <header className="App-header">{wasm ? <Loaded wasm={wasm} /> : <Unloaded loading={loading} loadWasm={loadWasm} />}</header>
        </div>
    )
}
