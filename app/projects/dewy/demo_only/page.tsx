'use client'
import { useRef, useEffect } from 'react'
import { PyModule } from '@/app/(hooks)/pyodide'
import { DewyDemo } from '../dewy'
import { fetch_dewy_interpreter_source } from '../fetch_dewy'
import { useSearchParams } from 'next/navigation'

const Page = async (): Promise<JSX.Element> => {
    const dewy_interpreter_source = await fetch_dewy_interpreter_source()

    // check url parameter for initial code to give to demo
    return (
        <div className="w-screen h-screen absolute top-0 left-0 z-50 bg-black overflow-y-scroll">
            {<Content dewy_interpreter_source={dewy_interpreter_source} />}
        </div>
    )
}

const Content = ({ dewy_interpreter_source }: { dewy_interpreter_source: PyModule[] }): JSX.Element => {
    const searchParams = useSearchParams()
    const src = searchParams.get('src') || 'printl"Hello, World!"'
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                // handle the resize event here
                // console.log('Size changed', entry.contentRect)
                const { width, height } = entry.contentRect
                // Post message to parent with size
                window.parent.postMessage({ width, height })
            }
        })

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current)
        }

        return () => resizeObserver.disconnect()
    }, [])

    return (
        <div ref={containerRef}>
            <div className="p-2">
                <DewyDemo dewy_interpreter_source={dewy_interpreter_source} initial_code={src} />
            </div>
        </div>
    )
}

export default Page
