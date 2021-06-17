import React from 'react'
import { PageContainer, PageHeading } from '../../Components'
import { useGithubTimestamp } from '../../utilities'

export const MusicalDL = (): JSX.Element => {
    const timestamp = useGithubTimestamp('MusicalDL')

    return (
        <>
            <PageContainer>
                <PageHeading title="Musical Deep Learning" subtitle={timestamp} />
                <p>
                    For the capstone project of Machine Learning: Deep Learning (EN.601.682), we were tasked to form teams and apply deep learning to a topic of
                    our choosing. My team of 3 was interested in music, so we attempted to create a deep learning based synthesizer, targeted at choral music.
                </p>
            </PageContainer>
        </>
    )
}
