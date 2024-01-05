'use client'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash'
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python'
import { hybrid, railscasts } from 'react-syntax-highlighter/dist/esm/styles/hljs'
SyntaxHighlighter.registerLanguage('bash', bash)
SyntaxHighlighter.registerLanguage('python', python)

type Language = 'bash' | 'python'
const styles = { hybrid, railscasts }
type Style = keyof typeof styles

export const PlaintextBlock = ({ text, className = '' }: { text: string; className?: string }) => {
    return (
        <div className="mb-6">
            <HorizontalScroll className={twMerge('w-full rounded-md', className)}>
                <div className="w-full">
                    <div className="p-2 whitespace-pre font-fira-code">{text}</div>
                </div>
            </HorizontalScroll>
        </div>
    )
}

export const CodeBlock = ({
    language,
    style,
    code,
    className = '',
}: {
    language?: Language
    style?: Style
    code: string
    className?: string
}) => {
    return (
        // rounded corners around code block
        <div className={twMerge('rounded-md overflow-hidden mb-6', className)}>
            <SyntaxHighlighter language={language} style={style ? styles[style] : railscasts}>
                {code}
            </SyntaxHighlighter>
        </div>
    )
}

//single line of code
export const Code = ({ language, style: style_str, code }: { language?: Language; style?: Style; code: string }) => {
    const style = style_str ? styles[style_str] : railscasts
    const backgroundColor = style.hljs.background as string
    return (
        <span className="rounded-md">
            <SyntaxHighlighter
                language={language}
                style={style}
                customStyle={{
                    display: 'inline',
                    padding: '0.125rem 0.25rem',
                    margin: '0 0.125rem',
                    backgroundColor: backgroundColor,
                    border: '1px solid #444444',
                    borderRadius: 'inherit',
                }}
            >
                {code}
            </SyntaxHighlighter>
        </span>
    )
}

import { useCodeMirror, Extension, BasicSetupOptions } from '@uiw/react-codemirror'
import { LanguageSupport } from '@codemirror/language'
import { useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { HorizontalScroll } from '@/app/(components)/ui'

export type Token = {
    type: string
    start: number
    end: number
}

export type match_fn<T> = (s: string, state: T) => Token | Token[] | undefined

export type CodeEditorProps = {
    text: string
    setText?: (s: string) => void
    readonly?: boolean
    editable?: boolean
    basicSetup?: BasicSetupOptions
    theme: Extension
    language: LanguageSupport
    onFocus?: () => void
    className?: string
}

export const CodeEditor = ({
    text,
    setText,
    readonly,
    editable,
    basicSetup = {},
    theme,
    language,
    onFocus,
    className,
}: CodeEditorProps): JSX.Element => {
    const editor = useRef(null)
    const { setContainer } = useCodeMirror({
        container: editor.current,
        theme: theme,
        value: text,
        readOnly: readonly,
        editable: editable,
        extensions: [language],
        onChange: (value: string) => {
            setText?.(value)
        },
        basicSetup: {
            lineNumbers: false,
            foldGutter: false,
            drawSelection: false,
            allowMultipleSelections: false,
            highlightActiveLine: true,
            highlightSelectionMatches: false,
            dropCursor: false,
            indentOnInput: false,
            rectangularSelection: false,
            tabSize: 4,
            closeBracketsKeymap: false,
            searchKeymap: false,
            foldKeymap: false,
            completionKeymap: false,
            lintKeymap: false,
            autocompletion: false,

            // bracketMatching?: boolean;
            // closeBrackets?: boolean;
            // crosshairCursor?: boolean;

            ...basicSetup,
        },
    })

    useEffect(() => {
        if (editor.current) {
            setContainer(editor.current)
        }
    })

    return (
        <div className={twMerge('w-full rounded-md overflow-hidden', className)}>
            <HorizontalScroll className="w-full">
                <div onFocus={onFocus}>
                    <div ref={editor} />
                </div>
            </HorizontalScroll>
        </div>
    )
}
