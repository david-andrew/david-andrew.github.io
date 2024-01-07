'use client'
import { CodeEditor } from '@/app/(components)/syntax'
import { dewy_lang, dewy_theme } from '@/app/(components)/syntax_dewy'

export const DewyCodeBlock = ({ src }: { src: string }): JSX.Element => {
    return (
        <CodeEditor
            className="w-full bg-[#232323] text-xl md:text-lg my-6"
            readonly
            language={dewy_lang()}
            theme={dewy_theme}
            text={src}
        />
    )
}
