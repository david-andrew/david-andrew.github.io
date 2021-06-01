import React from 'react'
import { Link } from 'react-router-dom'
import { PageContainer, PageHeading } from '../../Components'

export const SoVoice = (): JSX.Element => {
    return (
        <>
            <PageContainer>
                <PageHeading title="so voice!" subtitle="January 2021" />
                <p>
                    so voice! is the spiritual successor to my <Link to="/projects/musical_dl">Deep Learning Capstone Project</Link>. The goal is to develop a
                    choir synthesizer that leverages deep learning to produce audio that is indistinguishable from real recordings.
                </p>
                <h3>Method</h3>
                <p>Since I intend to commercialize </p>
            </PageContainer>
        </>
    )
}
