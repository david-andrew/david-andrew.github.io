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
                    our choosing. My team of 3 attempted to create a deep learning based choral music synthesizer. Since singing voice synthesizers were (and
                    still are) a relatively unexplored area of machine learning, we each decided to apply separate ML architectures to our problem&mdash;I chose
                    to focus on the WaveNet architecture.
                </p>
                <h3>WaveNet</h3>
                <p>
                    At the time, the state of the art in pure speech synthesis was Google&apos;s WaveNet architecture, which they used extensively in their
                    Google Assistant.
                </p>
            </PageContainer>
        </>
    )
}
