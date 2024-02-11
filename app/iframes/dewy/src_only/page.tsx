'use client'
import { useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { DewyCodeBlock } from '@/app/projects/dewy/code_block'

const Page = (): JSX.Element => {
    // check url parameter for initial code to give to demo
    const searchParams = useSearchParams()
    const src = searchParams.get('src') || "printl'Hello, World!'"
    const id = searchParams.get('id') || 'DewyIframe'
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                // Post message to parent with size
                const { width, height } = entry.contentRect
                window.parent.postMessage({ width, height, id }, '*') //anywhere is welcome to iframe and receive the message
            }
        })

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current)
        }

        return () => resizeObserver.disconnect()
    }, [])

    return (
        <div className="w-screen h-screen absolute top-0 left-0 z-50 bg-black overflow-y-hidden">
            {/* -my-6 to counteract the margin from the code block. */}
            {/* TODO: make the codeblock not include my-6 */}
            <div ref={containerRef} className="-my-6">
                <DewyCodeBlock src={src} />
            </div>
        </div>
    )
}

export default Page
