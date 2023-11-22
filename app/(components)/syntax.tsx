"use client";
import {Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import bash from 'react-syntax-highlighter/dist/esm/languages/hljs/bash'
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python'
import { hybrid, railscasts } from 'react-syntax-highlighter/dist/esm/styles/hljs'
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('python', python)

type Language = 'bash' | 'python'
const styles = { hybrid, railscasts }
type Style = keyof typeof styles

export const CodeBlock = ({ language, style, code }:{ language?:Language, style?:Style, code:string }) => { 
    return (
        // rounded corners around code block
        <div className='rounded-md overflow-hidden mb-6'>
            <SyntaxHighlighter language={language} style={style ? styles[style] : railscasts}>
                {code}
            </SyntaxHighlighter>
        </div>
    );
}

//single line of code
export const Code = ({ language, style: style_str, code }: { language?:Language, style?:Style, code:string }) => {
    const style = style_str ? styles[style_str] : railscasts
    const backgroundColor = style.hljs.background as string
    return (
        <span className='rounded-md'>
            <SyntaxHighlighter 
                language={language} 
                style={style}
                customStyle={{
                    display: 'inline',
                    padding: '0.125rem 0.25rem',
                    margin: "0 0.125rem",
                    backgroundColor: backgroundColor,
                    border: '1px solid #444444',
                    borderRadius: 'inherit',
                }}
            >
                {code}
            </SyntaxHighlighter>
        </span>
    );
}