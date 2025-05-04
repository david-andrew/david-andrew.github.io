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
import CodeMirror from '@uiw/react-codemirror'
import { LanguageSupport, StreamLanguage } from '@codemirror/language'
import { useState, useEffect, useRef, use } from 'react'
import { twMerge } from 'tailwind-merge'
import { HorizontalScroll } from '@/app/(components)/ui'
import { tags } from '@lezer/highlight'

export type Token = {
    type: keyof typeof tags
    start: number
    end: number
}

export type BaseTokenizerState = {
    tokens: Token[]
    index: number
}

export type match_fn<T> =
    | ((s: string) => Token | Token[] | undefined)
    | ((s: string, state: T) => Token | Token[] | undefined)

export const parse_lang = <T,>(code: string, state: T, get_matchers: (state: T) => match_fn<T>[]): Token[] => {
    // console.log('parsing:', code)
    let tokens: Token[] = []
    let index = 0

    while (index < code.length) {
        const matchers = get_matchers(state)
        // TODO: this should actually look for the longest match out of all matchers rather than just take the first one
        let token = matchers.reduce<Token | Token[] | undefined>(
            (token, matcher) => (token ? token : matcher(code.slice(index), state)),
            undefined,
        )
        if (token) {
            // console.log('matched token(s):', token)
            if (Array.isArray(token)) {
                tokens.push(
                    ...token.map((t) => {
                        t.start += index
                        t.end += index
                        return t
                    }),
                )
                index = token[token.length - 1].end
            } else {
                token.start += index
                token.end += index
                tokens.push(token)
                index = token.end
            }
        } else {
            // console.log('no match, skipping character:', code[index])
            tokens.push({ type: 'invalid', start: index, end: index + 1 })
            index++
        }
    }

    return tokens
}

export const get_lang_support = <T extends BaseTokenizerState>(
    parse_lang: (code: string, state: T) => Token[],
    get_default_tokenizer_state: () => T,
): (() => LanguageSupport) => {
    return (): LanguageSupport => {
        const parser = {
            token: (stream: any, state: T) => {
                if (state.index >= state.tokens.length) {
                    state.tokens = parse_lang(stream.string, state)
                    state.index = 0
                }

                if (state.index < state.tokens.length) {
                    const token = state.tokens[state.index++]
                    stream.pos = token.end
                    return token.type
                }

                stream.skipToEnd()
                return null
            },
            startState: get_default_tokenizer_state,
        }

        return new LanguageSupport(StreamLanguage.define(parser))
    }
}

const KeyListener = ({
    children,
    onKey,
}: {
    children: React.ReactNode
    onKey?: (currentKeys: string[], event: KeyboardEvent) => void
}) => {
    // keeps track of the currently pressed keys
    const keys = useRef([] as string[])

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key
            keys.current = [...new Set([...keys.current, key])] // Add the key to the list of currently pressed keys (ensuring no duplicates)
            onKey?.(keys.current, event) // Call the provided callback function with the current keys
        }
        const handleKeyUp = (event: KeyboardEvent) => {
            const key = event.key
            keys.current = keys.current.filter((k) => k !== key) // Remove the key from the list of currently pressed keys
            onKey?.(keys.current, event) // Call the provided callback function with the current keys
        }

        // Attach the event listener to the window object
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [onKey]) // Re-attach the listener if the onKey callback changes

    return <div>{children}</div>
}

export type CodeEditorProps = {
    text: string
    setText?: (s: string) => void
    readonly?: boolean
    editable?: boolean
    basicSetup?: BasicSetupOptions
    theme: Extension
    language: LanguageSupport
    onFocus?: () => void
    keyListener?: (keys: string[], event: KeyboardEvent) => void
    className?: string
    setFocusCallback?: (f: () => void) => void
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
    keyListener,
    className,
    setFocusCallback,
}: CodeEditorProps): JSX.Element => {
    const editor = useRef<HTMLDivElement>(null)
    const parent = useRef<HTMLDivElement>(null)
    const [parentWidth, setParentWidth] = useState(1024)

    useEffect(() => {
        if (parent.current && parent.current.clientWidth !== parentWidth) {
            setParentWidth(parent.current.clientWidth)
        }

        //callback for when the window is resized
        if (!parent.current) return
        const resizeObserver = new ResizeObserver(() => {
            if (parent.current && parent.current.clientWidth !== parentWidth) {
                setParentWidth(parent.current.clientWidth)
            }
        })
        resizeObserver.observe(parent.current)
        return () => resizeObserver.disconnect()
    })

    const { view, setContainer } = useCodeMirror({
        container: editor.current,
        minWidth: `${parentWidth}px`,
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
            defaultKeymap: false,

            // bracketMatching?: boolean;
            // closeBrackets?: boolean;
            // crosshairCursor?: boolean;

            ...basicSetup,
        },
    })

    useEffect(() => {
        if (editor.current) {
            setContainer(editor.current)
            setFocusCallback?.(() => {
                view?.focus()
            })
        }
    })

    return (
        <div className={twMerge('w-full rounded-md overflow-hidden', className)} ref={parent}>
            <HorizontalScroll className="w-full">
                <KeyListener onKey={keyListener}>
                    <div onFocus={onFocus}>
                        <div ref={editor} />
                    </div>
                </KeyListener>
            </HorizontalScroll>
        </div>
    )
}
