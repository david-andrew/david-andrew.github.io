import React from 'react'
import { InternalLink } from '../../utilities'
import YouTube from 'react-youtube'
import { Divider } from 'semantic-ui-react'
import { PageContainer, PageHeading } from '../../Components'

export const Compositions = (): JSX.Element => {
    return (
        <>
            <PageContainer>
                <PageHeading />
                <p>
                    These are two pieces I composed for my high school choir, and was able to get good recordings of. I also have several other unrecorded
                    pieces, which I&apos;m hoping to add here once <InternalLink to="/projects/so_voice">so voice!</InternalLink> is able to produce good enough
                    recordings.
                </p>
                <h3>Deep Field</h3>
                <p>CB West Chamber Choir - Trinity Cathedral, Trenton NJ, 2015</p>
                <YouTube videoId="4WJfvuVrqfA" opts={{ width: '100%' }} />
                <Divider />
                <h3>Invictus</h3>
                <p>CB West Men&apos;s Ensemble - Main St Baptist Church, Doylestown PA, 2014</p>
                <YouTube videoId="EcNoVvlkyM8" opts={{ width: '100%' }} />
            </PageContainer>
        </>
    )
}
