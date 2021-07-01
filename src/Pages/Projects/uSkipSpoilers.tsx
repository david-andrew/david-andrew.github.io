import React from 'react'
import { Icon } from 'semantic-ui-react'
import { PageContainer, PageHeading } from '../../Components'
import { ExternalLink } from '../../utilities'
import { useGithubTimestamp } from '../../utilities'

export const SkipSpoilers = (): JSX.Element => {
    return (
        <>
            <PageContainer>
                <PageHeading />
                <p>
                    uSkipSpoilers is a small chrome extension I made mostly as a joke for my brother who is extremely spoiler averse. Beyond that, my goal was
                    to gain experience developing browser extensions which would help me to build more in the future.
                </p>
                <p>
                    uSkipSpoilers allows you to tag sections of a YouTube video as &quot;Spoilers&quot; and then during video playback, it will hide those
                    portions of the video. Spoiler boundaries are saved to the video URL which can then be easily shared with someone else who has the
                    extension. So for example, say I want to send a youtube video to my brother about a something, but I notice it contains spoilers for a movie
                    he is planning to watch, I can annotate the spoiler timestamps in the extension, and then send the custom link with the annotations, and
                    then he can watch without worry.
                </p>
                <h3>Try It</h3>
                <span>
                    <Icon name="chrome" size="big" />
                    <ExternalLink href="https://chrome.google.com/webstore/detail/uskipspoilers/gahcifkbhfpglehmpapbhcafiailckcd">
                        uSkipSpoilers Chrome Extension
                    </ExternalLink>
                </span>
                <h3>Github</h3>
                <span>
                    <Icon name="github" size="big" />
                    <ExternalLink href="https://github.com/david-andrew/uSkipSpoilers">uSkipSpoilers git repo</ExternalLink>
                </span>
            </PageContainer>
        </>
    )
}
