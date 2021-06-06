/* eslint-disable @typescript-eslint/no-var-requires */

import React, { useState } from 'react'
// this just loads stuff to load the wasm
// import hello from '../../wasm/hello'
import DewyParserWrapper from '../../wasm/dewy_parser_wrapper'

const Loaded = ({ wasm }: { wasm: any }) => (
    <button
        onClick={() => {
            type wrapper_signature = (grammar_source: string, input_source: string) => void
            const dewy_parser = wasm.cwrap('dewy_parser', 'void', ['string', 'string']) as wrapper_signature
            const grammar_source = `#E = '(' #ws* #E #ws* ')';
#E = #E #ws* [+\-] #ws* #E;
#E = #E #ws* [*/] #ws* #E;
#E = #E #ws* '^' #ws* #E;
#E = #N | #I;
#N = [0-9]+;
#I = [A-Za-z_] [A-Za-z0-9!@%&_?]*;
#ws = [\\n\\x20];
#start = (#ws* #E)+;`
            const input_source = `1+2*3♥`
            try {
                dewy_parser(grammar_source, input_source)
            } catch {
                console.log('call to parser threw an error')
            }

            // console.log('would call wasm here')
            // console.log(wasm)
            // const func = wasm.cwrap('func', 'int', ['int', 'int'])
            // console.log(func(1, 6))
            // const func2 = wasm.cwrap('func2', 'void', ['string', 'string'])
            // console.log(func2('apple', 'banana'))
            // try {
            //     const segfault = wasm.cwrap('segfault', 'void', ['string', 'string'])
            //     console.log(segfault('apple', 'banana'))
            // } catch {
            //     console.log('catching segfault error')
            // }

            //TODO->redirect console output to a variable string...
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
            const wasm = DewyParserWrapper({
                onRuntimeInitialized: () => {
                    ;(async () => {
                        setWasm(await wasm)
                    })()
                },
                // This overrides the default path used by the wasm/hello.js wrapper
                locateFile: () => require('../../wasm/dewy_parser_wrapper.wasm').default,
                print: function (text: string) {
                    console.log(`My custom print statement: \`${text}\``)
                },
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
