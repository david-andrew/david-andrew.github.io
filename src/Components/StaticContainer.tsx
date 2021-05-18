import React from 'react'

interface Props {
    children: React.ReactNode
}

//blue background square for putting content on a static (i.e. non-scrollable) page
export const StaticContainer = ({ children }: Props): JSX.Element => {
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', backgroundColor: 'black' }}>
            {children}
        </div>
    )
}
