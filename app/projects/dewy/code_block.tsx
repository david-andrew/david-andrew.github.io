'use client'
import { CodeEditor } from '@/app/(components)/syntax'
import { dewy_lang, dewy_theme } from '@/app/(components)/syntax_dewy'
import { twMerge } from 'tailwind-merge'

export const DewyCodeBlock = ({ src, className = '' }: { src: string; className?: string }): JSX.Element => {
    return (
        <CodeEditor
            className={twMerge('w-full bg-[#232323] text-xl md:text-lg my-6', className)}
            readonly
            editable={false}
            basicSetup={{ highlightActiveLine: false }}
            language={dewy_lang()}
            theme={dewy_theme}
            text={src}
        />
    )
}
