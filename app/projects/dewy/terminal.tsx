import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

type TerminalInterface = {
    divRef: React.RefObject<HTMLDivElement>
    write: (msg: string) => void
    // read: () => string
    // clear: () => void
    // onCtrlC: ()  => void
}

export const useXterm = (): TerminalInterface => {
    const divRef = useRef<HTMLDivElement>(null)
    const xtermRef = useRef<Terminal>()

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

    const write = (msg: string) => {
        xtermRef.current?.write(msg)
        console.log('writing message to terminal: ', msg)
    }

    return { divRef, write }
}
