import { useState, useRef } from 'react'

export const useDebouncedState = <T>(initialValue: T, delay: number): [T, (value: T | ((prev: T) => T)) => void] => {
    const [state, setState] = useState<T>(initialValue)
    const internalState = useRef<T>(initialValue)
    const waiting = useRef<boolean>(false)

    const debouncedSetState = (value: T | ((prev: T) => T)) => {
        if (typeof value === 'function') {
            internalState.current = (value as (prev: T) => T)(internalState.current)
        } else {
            internalState.current = value
        }
        if (!waiting.current) {
            waiting.current = true
            setTimeout(() => {
                setState(internalState.current)
                waiting.current = false
            }, delay)
        }
    }

    return [state, debouncedSetState]
}
