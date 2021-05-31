import React from 'react'

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
