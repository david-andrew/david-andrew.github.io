import React from 'react'
import { Container } from 'semantic-ui-react'
import { DummyNavBar } from './Navbar'

interface Props {
    children: React.ReactNode
}

//simple container for page body
export const PageContainer = ({ children }: Props): JSX.Element => {
    return (
        <div style={{ backgroundColor: 'black' }}>
            <DummyNavBar />
            <Container>
                <div style={{ fontFamily: 'gentona', fontSize: '100%', textAlign: 'justify', paddingTop: '1em', paddingBottom: '1em' }}>{children}</div>
            </Container>
        </div>
    )
}
