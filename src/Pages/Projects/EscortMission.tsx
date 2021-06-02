import React, { useState } from 'react'
import { PageContainer, PageHeading, getGithubTimestamp } from '../../Components'
import { toMonthYearString } from '../../utilities'

export const EscortMission = (): JSX.Element => {
    //fetch the update time for the subtitle
    const [subtitle, setSubtitle] = useState<string>('Fetching Date...')
    getGithubTimestamp('uSkipSpoilers', (timestamp?: Date) => {
        if (timestamp !== undefined) {
            setSubtitle(toMonthYearString(timestamp))
        } else {
            setSubtitle('Unknown Date')
        }
    })

    return (
        <>
            <PageContainer>
                <PageHeading title="Escort Mission 2020" subtitle="" />
            </PageContainer>
        </>
    )
}
