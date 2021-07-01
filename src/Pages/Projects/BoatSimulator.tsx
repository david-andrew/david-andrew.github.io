import React from 'react'
import { Icon, List } from 'semantic-ui-react'
import { Collage, PageContainer, PageHeading } from '../../Components'
import { ExternalLink } from '../../utilities'

export const BoatSimulator = (): JSX.Element => {
    //image objects for photo collage
    const r = require.context('../../images/boat_simulator')
    const imageSrcs = r.keys().map((path: string) => r(path).default) as string[]

    return (
        <>
            <PageContainer>
                <PageHeading />
                <p>
                    Boat Simulator was a small Unity3D game I made at the Spring 2017 JHU hackathon. My initial goal was to build a game that demonstrated the
                    physics of sailing, especially the fact that sailing with the wind is one of the slower directions you can sail. Ultimately, building a
                    completely accurate simulation was a bit beyond my Unity skills, but, with some suggestions from family, I did end up with a fun little
                    meditative experience.
                    <br />
                    <br />
                    The player controls a small boat sailing along an endless ocean under a starry sky. John Tavener&apos;s Song for Athene provides an ethereal
                    soundscape for the dreamlike scene. The entire game lasts for about 7 minutes, with the boat picking up speed towards the climax of the
                    song, and ultimately taking off for the great beyond.
                </p>
                <h3>Photos</h3>
                <Collage imageSrcs={imageSrcs} rowSizes={[1, 2, 3]} />
                <h3>Try It</h3>
                <List>
                    <List.Item>
                        <span>
                            <Icon name="windows" size="big" />
                            <ExternalLink href="https://www.dropbox.com/s/95v6y2a4zgls45y/Build11_Windows_64_bit.zip?dl=0">
                                Boat Simulator Build 11
                            </ExternalLink>
                        </span>
                    </List.Item>
                    <List.Item>
                        <span>
                            <Icon name="apple" size="big" />
                            Recommend using <ExternalLink href="https://www.winehq.org/">Wine</ExternalLink>
                        </span>
                    </List.Item>
                    <List.Item>
                        <span>
                            <Icon name="linux" size="big" />
                            Recommend using <ExternalLink href="https://www.winehq.org/">Wine</ExternalLink>
                        </span>
                    </List.Item>
                </List>
            </PageContainer>
        </>
    )
}
