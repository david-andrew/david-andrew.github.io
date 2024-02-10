'use client'
import { useEffect, useRef } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { useDebouncedState } from '@/app/(hooks)/debounce'
import 'xterm/css/xterm.css'

type TerminalInterface = {
    divRef: React.RefObject<HTMLDivElement>
    write: (msg: string) => void
    read: () => Promise<string>
    clear: () => void
    focus: () => void
    fitWidth: () => void
}

export const useXterm = (minLines: number = 4, maxLines: number = 25): TerminalInterface => {
    const divRef = useRef<HTMLDivElement>(null)
    const xtermRef = useRef<Terminal>()
    const fitAddonRef = useRef<FitAddon>()
    const inputBufferRef = useRef<string[]>()
    const inputDoneCallbackRef = useRef<(input: string) => void>()
    const initNumLines = 1 // this is how many blank lines after user input to display
    const [numLines, setNumLines] = useDebouncedState(initNumLines, 20)

    useEffect(() => {
        // when container resizes, fit the terminal to the new width
        const resizeObserver = new ResizeObserver(() => {
            fitWidth()
        })

        if (divRef.current) {
            resizeObserver.observe(divRef.current)
        }

        // Initialize Xterm
        if (divRef.current && !xtermRef.current) {
            const term = new Terminal({
                convertEol: true,
                fontSize: 18, //TODO: some way to set this differently if on mobile?
                fontFamily: 'monospace',
            })
            const fitAddon = new FitAddon()
            term.loadAddon(fitAddon)
            term.open(divRef.current)
            fitAddon.fit()
            fitAddonRef.current = fitAddon

            // Call the input callback whenever user types something
            term.onData((data) => {
                //currently in input read mode
                if (inputBufferRef.current !== undefined) {
                    if (data === '\r') {
                        inputDoneCallbackRef.current?.(inputBufferRef.current.join(''))
                        inputBufferRef.current = undefined
                        inputDoneCallbackRef.current = undefined
                        term.write('\r\n')
                        setNumLines((prev) => prev + 1)
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

            // prevent arrow keys from operating
            term.attachCustomKeyEventHandler((e) => {
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
                    return false
                }
                return true
            })

            // Store the term reference for later use
            xtermRef.current = term
        }

        // Cleanup on unmount
        return () => {
            if (xtermRef.current) {
                xtermRef.current.dispose()
            }
            if (divRef.current) {
                resizeObserver.unobserve(divRef.current)
            }
        }
    }, [])

    useEffect(() => {
        xtermRef.current?.resize(xtermRef.current.cols, Math.min(Math.max(numLines, minLines), maxLines))
    }, [numLines])

    // set state to reading and wait for input to resolve
    const read = async (): Promise<string> => {
        return new Promise((resolve) => {
            inputBufferRef.current = []
            inputDoneCallbackRef.current = resolve
        })
    }

    const write = (msg: string) => {
        xtermRef.current?.write(msg)
        //count the number of newlines in the message and update the line count
        setNumLines((prev) => prev + (msg.match(/\n/g) || []).length)
    }

    const clear = () => {
        //write a newline so that even if the cursor was on the first line, the line will be erased
        //once newline is written, clear the terminal and reset the line count
        xtermRef.current?.write('\r\n', () => {
            xtermRef.current?.clear()
            setNumLines(initNumLines)
        })
    }

    const focus = () => {
        xtermRef.current?.focus()
    }

    const fitWidth = () => {
        if (!xtermRef.current || !fitAddonRef.current) return
        const rows = xtermRef.current.rows
        fitAddonRef.current.fit()
        xtermRef.current.resize(xtermRef.current.cols, rows)
    }

    return { divRef, read, write, clear, focus, fitWidth }
}
