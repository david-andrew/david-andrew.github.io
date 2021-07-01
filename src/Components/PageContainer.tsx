import React from 'react'
import { Container } from 'semantic-ui-react'
import { useGithubTimestamp, useProjectData } from '../utilities'
import { DummyNavBar } from './Navbar'
import { useLocation } from 'react-router-dom'
import './PageContainer.css'

interface Props {
    children: React.ReactNode
}

//simple container for page body
export const PageContainer = ({ children }: Props): JSX.Element => {
    return (
        <div className="PageContainer" style={{ backgroundColor: 'black' }}>
            <DummyNavBar />
            <Container>
                <div style={{ fontFamily: 'gentona', fontSize: '100%', textAlign: 'justify', paddingTop: '1em', paddingBottom: '1em' }}>{children}</div>
            </Container>
            <div style={{ height: '1em' }} />
        </div>
    )
}

export const PageHeading = ({ title, subtitle }: { title?: string; subtitle?: string }): JSX.Element => {
    //fetch project data
    const location = useLocation()
    const project = useProjectData(location.pathname)

    //get the timestamp, either from github, or from the lastUpdated field
    const githubTimestamp = useGithubTimestamp(project.github)
    const timestamp = project.github !== undefined ? githubTimestamp : project.lastUpdated ?? ''

    return (
        <>
            <h1 style={{ marginBottom: 0 }}>{title ?? project.title}</h1>
            <p>{subtitle ?? timestamp}</p>
        </>
    )
}
