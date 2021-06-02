import React from 'react'
import { Link } from 'react-router-dom'
import { CodeBlock as AtlasCodeBlock, Code as AtlasCode } from '@atlaskit/code'
import { AtlaskitThemeProvider } from '@atlaskit/theme/components'
import { ThemeModes } from '@atlaskit/theme'

//place this after any element that needs to be clearfixed
export const ClearFixAfter = (): JSX.Element => {
    return <div style={{ clear: 'both', display: 'table' }}></div>
}

export const ExternalLink = ({ href, children, style }: { href: string; children?: React.ReactNode; style?: React.CSSProperties }): JSX.Element => {
    return (
        <a href={href} target="_blank" rel="noreferrer noopener" style={style}>
            {children}
        </a>
    )
}

//thin wrapper around react-dom <Link> which scrolls to the top when clicked
export const InternalLink = ({ to, children }: { to: string; children: React.ReactNode }): JSX.Element => {
    return (
        <Link
            to={to}
            onClick={(): void => {
                window.scrollTo(0, 0)
            }}
        >
            {children}
        </Link>
    )
}

//inline code
export const Code = ({ children }: { children: React.ReactNode }): JSX.Element => {
    //dark mode theme handled by css
    return <AtlasCode>{children}</AtlasCode>
}

//full code block
export const CodeBlock = ({ text, showLineNumbers = false }: { text: string; showLineNumbers?: boolean }): JSX.Element => {
    return (
        <>
            <AtlaskitThemeProvider mode="dark">
                <AtlasCodeBlock text={text} showLineNumbers={showLineNumbers} />
            </AtlaskitThemeProvider>
            <br />
        </>
    )
}
