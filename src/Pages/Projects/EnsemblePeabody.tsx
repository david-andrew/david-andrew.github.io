import React from 'react'
import { PageContainer, PageHeading } from '../../Components'
import { useGithubTimestamp } from '../../utilities'

export const EnsemblePeabody = (): JSX.Element => {
    const timestamp = useGithubTimestamp('Ensemble')

    return (
        <>
            <PageContainer>
                <PageHeading title="Ensemble" subtitle={timestamp} />
            </PageContainer>
        </>
    )
}
