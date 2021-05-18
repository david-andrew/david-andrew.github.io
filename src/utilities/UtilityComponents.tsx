import React from 'react'

//place this after any element that needs to be clearfixed
export const ClearFixAfter = (): JSX.Element => {
    return <div style={{ clear: 'both', display: 'table' }}></div>
}

//custom h1-h6 with quadon + non-bold font
const headingStyle: React.CSSProperties = { fontWeight: 'normal', fontFamily: 'quadon' }
export const H1 = ({ children }: { children: React.ReactNode }) => <h1 style={headingStyle}>{children}</h1>
export const H2 = ({ children }: { children: React.ReactNode }) => <h2 style={headingStyle}>{children}</h2>
export const H3 = ({ children }: { children: React.ReactNode }) => <h3 style={headingStyle}>{children}</h3>
export const H4 = ({ children }: { children: React.ReactNode }) => <h4 style={headingStyle}>{children}</h4>
export const H5 = ({ children }: { children: React.ReactNode }) => <h5 style={headingStyle}>{children}</h5>
export const H6 = ({ children }: { children: React.ReactNode }) => <h6 style={headingStyle}>{children}</h6>
