import React from 'react'

//place this after any element that needs to be clearfixed
export const ClearFixAfter = (): JSX.Element => {
    return <div style={{ clear: 'both', display: 'table' }}></div>
}

export const ExternalLink = ({ href, children, ...props }: { href: string; children?: React.ReactNode }): JSX.Element => {
    return (
        <a href={href} target="_blank" rel="noreferrer noopener" {...props}>
            {children}
        </a>
    )
}
