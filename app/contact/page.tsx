"use client";
import { IconBullet, IconBulletList } from '../(components)/icon_bullet'
import { NavbarDummy } from '../(components)/navbar'
import { Link } from '../(components)/ui'
import { useState, useEffect, useRef } from 'react'

// convert a hex color e.g. "#002d72" to an rgb tuple e.g. [0, 0.176470588, 0.447058824]
const hex_to_rgb = (hex: string): [number, number, number] => {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    return [r, g, b]
}

const Page = () => {
    // keep track of/watch for changes of the accent color in document.documentElement.style.getPropertyValue('--accent-color')
    const [accentColor, setAccentColor] = useState<string>()
    const [iframeReady, setIframeReady] = useState(false)
    const iframeRef = useRef<HTMLIFrameElement>(null)

    // watch for changes to the accent color
    useEffect(() => {
        const updateAccentColor = () => {
            setAccentColor(document.documentElement.style.getPropertyValue('--accent-color'))
        }
        updateAccentColor()

        // use mutation observer to watch for changes to the accent color
        const observer = new MutationObserver(updateAccentColor)
        observer.observe(document.documentElement, { attributes: true })
        return () => observer.disconnect()
    }, [])


    // set up a listener for READY message from the iframe, in case it takes a moment to start
    useEffect(() => {
        const listener = (event: MessageEvent) => {
            if (event.data.type === 'READY') { setIframeReady(true) }
        }
        window.addEventListener('message', listener)
        return () => window.removeEventListener('message', listener)
    }, [])

    // post the accent color to the iframe
    useEffect(() => {
        if (iframeRef.current?.contentWindow && accentColor) {
            const color = hex_to_rgb(accentColor)
            iframeRef.current.contentWindow.postMessage({type: 'SET_COLOR', color}, 'https://david-andrew.github.io')
        }
    }, [accentColor, iframeReady])

    return (
        <>
            <div className="flex flex-col h-full">
                <iframe 
                    src="https://david-andrew.github.io/BusinessCard/" 
                    // src="http://localhost:5173"
                    className="absolute inset-0 w-full h-full"
                    ref={iframeRef}
                 />
                {/* <div className="w-full flex flex-row items-center justify-center flex-grow">
                    <div className="outline outline-white py-16 px-10 md:py-20 md:px-10 lg:py-36 lg:px-20">
                        <IconBulletList>
                            <IconBullet responsive icon="envelope">
                                <Link
                                    className="text-md md:text-xl lg:text-3xl font-quadon align-middle whitespace-nowrap"
                                    href="mailto:david.andrew.engineer@gmail.com"
                                >
                                    david.andrew.engineer@gmail.com
                                </Link>
                            </IconBullet>
                            <IconBullet responsive icon="linkedin">
                                <Link
                                    className="text-md md:text-xl lg:text-3xl font-quadon align-middle whitespace-nowrap"
                                    href="https://www.linkedin.com/in/dewy"
                                />
                            </IconBullet>
                        </IconBulletList>
                    </div>
                </div> */}
                <NavbarDummy />
            </div>
        </>
    )
}

export default Page
