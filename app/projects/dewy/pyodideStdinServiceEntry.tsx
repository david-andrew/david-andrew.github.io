'use client'
import { useEffect } from 'react'

export const PyodideStdinServiceWorker = (): JSX.Element => {
    useEffect(() => {
        console.log('trying to registering pyodideStdinService.ts')
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker
                .register(new URL('@/app/pyodideStdinService.ts', import.meta.url), { type: 'module' })
                .then((registration) => {
                    console.log('SW registered: ', registration)
                })
                .catch((registrationError) => {
                    console.error('SW registration failed: ', registrationError)
                })
        } else {
            console.error('service worker not supported')
        }
    }, [])

    return <></>
}
