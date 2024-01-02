'use client'
import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

type TerminalInterface = {
    divRef: React.RefObject<HTMLDivElement>
    write: (msg: string) => void
    read: () => Promise<string>
}

export const useXterm = (): TerminalInterface => {
    const divRef = useRef<HTMLDivElement>(null)
    const xtermRef = useRef<Terminal>()
    const inputBufferRef = useRef<string[]>()
    const inputDoneCallbackRef = useRef<(input: string) => void>()

    useEffect(() => {
        // Initialize Xterm
        if (divRef.current && !xtermRef.current) {
            const term = new Terminal({
                convertEol: true,
            })
            const fitAddon = new FitAddon()
            term.loadAddon(fitAddon)
            term.open(divRef.current)
            fitAddon.fit()

            // Call the input callback whenever user types something
            term.onData((data) => {
                //currently in input read mode
                if (inputBufferRef.current !== undefined) {
                    if (data === '\r') {
                        inputDoneCallbackRef.current?.(inputBufferRef.current.join(''))
                        inputBufferRef.current = undefined
                        inputDoneCallbackRef.current = undefined
                        term.write('\r\n')
                    } else if (data === '\x7f' || data === '\b') {
                        if (inputBufferRef.current.length > 0) {
                            inputBufferRef.current.pop()
                            term.write('\b \b')
                        }
                    } else {
                        inputBufferRef.current.push(data)
                        term.write(data)
                    }
                }
            })

            // prevent up/down arrow keys from operating
            term.attachCustomKeyEventHandler((e) => {
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    return false
                }
                return true
            })

            //TODO: right arrow should only work if not at the end of the current input. And left arrow should stop at the beginning of the current input

            // Store the term reference for later use
            xtermRef.current = term
        }

        // Cleanup on unmount
        return () => {
            if (xtermRef.current) {
                xtermRef.current.dispose()
            }
        }
    }, [])

    // set state to reading and wait for input to resolve
    const read = async (): Promise<string> => {
        return new Promise((resolve) => {
            inputBufferRef.current = []
            inputDoneCallbackRef.current = resolve
        })
    }

    const write = (msg: string) => {
        xtermRef.current?.write(msg)
    }

    return { divRef, read, write }
}
