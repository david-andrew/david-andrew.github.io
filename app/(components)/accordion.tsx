'use client'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const Accordion = ({
    title,
    children,
    defaultOpen = false,
}: {
    title?: string
    children: React.ReactNode
    defaultOpen?: boolean
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    const rotation = isOpen ? '' : '-rotate-90'

    return (
        <div className="my-2">
            <button className="flex items-center w-full text-left" onClick={() => setIsOpen(!isOpen)}>
                <svg
                    className={twMerge('h-4 w-4 mr-2 transform transition-transform', rotation)}
                    fill="currentColor"
                    viewBox="0 0 96.154 96.154"
                >
                    <path
                        d="M0.561,20.971l45.951,57.605c0.76,0.951,2.367,0.951,3.127,0l45.956-57.609c0.547-0.689,0.709-1.716,0.414-2.61
                            c-0.061-0.187-0.129-0.33-0.186-0.437c-0.351-0.65-1.025-1.056-1.765-1.056H2.093c-0.736,0-1.414,0.405-1.762,1.056
                            c-0.059,0.109-0.127,0.253-0.184,0.426C-0.15,19.251,0.011,20.28,0.561,20.971z"
                    />
                </svg>
                <span className="font-quadon text-xl">{title}</span>
            </button>
            {isOpen && <div className="py-2">{children}</div>}
        </div>
    )
}