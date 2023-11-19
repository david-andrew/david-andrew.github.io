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
        <div className='rounded-md overflow-hidden'>
            <SyntaxHighlighter language={language} style={style ? styles[style] : railscasts}>
                {code}
            </SyntaxHighlighter>
        </div>
    );
}