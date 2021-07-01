import React from 'react'
import { PageContainer, PageHeading } from '../../Components'
import { ExternalLink, useGithubTimestamp, AudioExamplePair } from '../../utilities'
import { List, Icon } from 'semantic-ui-react'
import brother_john from '../../audio/ensemble/brother_john.mp3'
import christmas_time from '../../audio/ensemble/christmas_time.mp3'
import hark_the_herald from '../../audio/ensemble/hark_the_herald.mp3'
import sanctus from '../../audio/ensemble/sanctus.mp3'
import upon_the_hearth from '../../audio/ensemble/upon_the_hearth.mp3'
import when_david_heard from '../../audio/ensemble/when_david_heard.mp3'

export const EnsemblePeabody = (): JSX.Element => {
    return (
        <>
            <PageContainer>
                <PageHeading />
                <p>
                    At the inaugural Peabody hackathon, Hacking Harmony, I built my first attempt at choral music synthesis. The concept was simple: autotune
                    google text-to-speech. Using Python, I built a music parsing engine which would read in a (well formed) MusicXML file, and then perform the
                    following steps:
                    <ol>
                        <li>generate a list of all words sung in the piece</li>
                        <li>download audio for each word from the google text-to-speech API</li>
                        <li>
                            use the{' '}
                            <ExternalLink href="https://montreal-forced-aligner.readthedocs.io/en/latest/introduction.html">
                                Montreal Forced Aligner
                            </ExternalLink>{' '}
                            to detect phoneme boundaries in each word
                        </li>
                        <li>send a recipe to Matlab containing each word, along with pitches and durations for constructing the song</li>
                    </ol>
                    At this point, Matlab takes over and splices all of the words together according to the recipe, while also autotuning each word. This part
                    is performed in Matlab as it had better tools for quickly writing an autotuner, including pitch detection, pitch shifting, and very robust
                    tools for working with audio data in general.
                </p>
                <p>
                    The output of this whole process sounds about how you&apos;d expect autotuned text-to-speech to sound&mdash;my favorite reaction was that it
                    sounded like a choir of demon chipmunks.
                </p>
                <AudioExamplePair
                    title="Examples"
                    pairs={[
                        {
                            audio1: { label: 'Hark the Herald Angels Sing - Felix Mendelssohn', src: hark_the_herald },
                            audio2: { label: 'Christmas Time is Here - arr. David Samson', src: christmas_time },
                        },
                        {
                            audio1: { label: 'Brother John - Folk Song', src: brother_john },
                            audio2: { label: 'When David Heard - Eric Whitacre (intro only)', src: when_david_heard },
                        },
                        {
                            audio1: { label: 'Sanctus (London) - Ola Gjeilo (intro only)', src: sanctus },
                            audio2: { label: 'Upon the Hearth - Matthew Samson', src: upon_the_hearth },
                        },
                    ]}
                />
                <p>
                    As usual, accurate pitch detection was the biggest problem I had to deal with (runner up being phoneme segmenting). I&apos;m always
                    surprised by how difficult such a simple sounding problem always turns out to be&mdash;in this case though, I think the out-of-tune-ness of
                    it is quite in line with the quality of the rest of the result.
                </p>
                <h3>Links</h3>
                <List>
                    <List.Item>
                        <span>
                            <Icon name="github" size="big" />
                            <ExternalLink href="https://github.com/david-andrew/Ensemble">Github Repo</ExternalLink>
                        </span>
                    </List.Item>
                </List>
            </PageContainer>
        </>
    )
}
