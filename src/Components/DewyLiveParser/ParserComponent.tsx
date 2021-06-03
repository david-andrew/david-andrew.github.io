import React, { useEffect } from 'react'
// import Module from './myModule'
import example_module from './myModule.js'

export const DewyLiveParser = (): JSX.Element => {
    useEffect(() => {
        console.log('before any wasm shenanigans')
        // const example_function = example_module.cwrap('example_function', 'void')
        // example_function()
    }, [])

    return <></>
}
