import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import 'xterm/css/xterm.css'

export const XtermComponent = () => {
    const terminalRef = useRef(null)
    const xtermRef = useRef(null)

    useEffect(() => {
        // Initialize Xterm
        if (terminalRef.current && !xtermRef.current) {
            const term = new Terminal()
            const fitAddon = new FitAddon()
            term.loadAddon(fitAddon)
            term.open(terminalRef.current)
            fitAddon.fit()

            // Example: Write something to the terminal
            term.writeln('Welcome to Xterm.js in React!')

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

    return <div className="w-full" ref={terminalRef} />
}

// export default XtermComponent
