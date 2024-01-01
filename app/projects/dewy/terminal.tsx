import { useEffect, useRef, useState } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

type TerminalInterface = {
    divRef: React.RefObject<HTMLDivElement>
    write: (msg: string) => void
    read: () => Promise<string>

    //TODO: want the interface to be a function that can be called without having to manage watching input manually
    // read: () => string
    // clear: () => void
    // onCtrlC: ()  => void
}

export const useXterm = (): TerminalInterface => {
    const divRef = useRef<HTMLDivElement>(null)
    const xtermRef = useRef<Terminal>()
    const [reading, setReading] = useState(false)

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
                if (data === '\b' || data === '\x7f') {
                    term.write('\b \b')
                } else if (data === '\r') {
                    term.write('\r\n')
                } else {
                    term.write(data)
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

    // TODO:
    // 1. set reading to true
    // 2. collect input until user presses enter
    // 3. set reading to false
    // 4. resolve promise with input
    const read = async (): Promise<string> => {
        return '<test stdin from xterm. todo:read actual stdin>'
    }

    const write = (msg: string) => {
        console.log('writing to xterm:', msg, xtermRef.current)
        xtermRef.current?.write(msg)
    }

    return { divRef, read, write }
}
