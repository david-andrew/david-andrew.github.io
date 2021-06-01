import React from 'react'
import { Icon } from 'semantic-ui-react'
import { Collage, PageContainer, PageHeading } from '../../Components'
import { ExternalLink } from '../../utilities'

export const BoatSimulator = (): JSX.Element => {
    //image objects for photo collage
    const r = require.context('../../images/boat_simulator')
    const imageSrcs = r.keys().map((path: string) => r(path).default) as string[]

    return (
        <>
            <PageContainer>
                <PageHeading title="Boat Simulator" subtitile="March 2017" />
                <p>
                    Boat Simulator was a small Unity3D game I made at the Spring 2017 JHU hackathon. My initial goal was to build a game that demonstrated the
                    physics of sailing, especially the fact that sailing with the wind is one of the slower directions you can sail. Ultimately, building a
                    completely accurate simulation was a bit beyond my Unity skills, but, with some suggestions from family, I did end up with a fun little
                    meditative experience.
                </p>
                <h3>Photos</h3>
                <Collage imageSrcs={imageSrcs} />
                <h3>Try It</h3>
                <span>
                    <Icon name="windows" size="big" />
                    <ExternalLink href="https://www.dropbox.com/s/95v6y2a4zgls45y/Build11_Windows_64_bit.zip?dl=0">Boat Simulator Build 11</ExternalLink>
                </span>
            </PageContainer>
        </>
    )
}
