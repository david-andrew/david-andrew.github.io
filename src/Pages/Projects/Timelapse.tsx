import React from 'react'
import { PageContainer, PageHeading } from '../../Components'
import { ExternalLink, InternalLink } from '../../utilities'
import { Icon, List } from 'semantic-ui-react'
import YouTube from 'react-youtube'
// import { Divider } from 'semantic-ui-react'

export const Timelapse = (): JSX.Element => {
    return (
        <>
            <PageContainer>
                <PageHeading />
                <p>
                    One of my more recent hobbies has been making timelapses of clouds. I like to think that someday I&apos;ll use these videos as reference
                    material for several of my games, like <InternalLink to="/projects/mehve">Mehve</InternalLink>, but for now I&apos;m content to just enjoy
                    them as cool videos.
                </p>
                <p>
                    To make a timelapse, I have a Raspberry Pi connected to a fixed webcam looking out the window. The Pi is running a simple python script I
                    wrote that takes the sequence of images in the timelapse, and saves them to a prespecified location&mdash;a very large hard drive in my
                    case. I then have a second python script which stitches the images together into a video for playback.
                </p>
                <h3>Videos</h3>
                <YouTube videoId="KeTi_bErBwM" opts={{ width: '100%', height: '500px' }} />
                <h3>Links</h3>
                <List>
                    <List.Item>
                        <span>
                            <Icon name="file alternate" size="big" />
                            <ExternalLink href="https://github.com/david-andrew/timelapse" download>
                                Github
                            </ExternalLink>
                        </span>
                    </List.Item>
                </List>
            </PageContainer>
        </>
    )
}
