"use client";
import { AudioGrid } from '@/app/(components)/audio';
import { Link, P, H3, OL } from '@/app/(components)/ui';
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet';
import brother_john from '@/app/(audio)/ensemble/brother_john.mp3'
import christmas_time from '@/app/(audio)/ensemble/christmas_time.mp3'
import hark_the_herald from '@/app/(audio)/ensemble/hark_the_herald.mp3'
import sanctus from '@/app/(audio)/ensemble/sanctus.mp3'
import upon_the_hearth from '@/app/(audio)/ensemble/upon_the_hearth.mp3'
import when_david_heard from '@/app/(audio)/ensemble/when_david_heard.mp3'

const Page = (): JSX.Element => {
    return (
        <>
            <P>
                At the inaugural Peabody hackathon, Hacking Harmony, I built my first attempt at choral music synthesis. The concept was simple: autotune
                google text-to-speech. Using Python, I built a music parsing engine which would read in a (well formed) MusicXML file, and then perform the
                following steps:
            </P>
            <OL>
                <li>generate a list of all words sung in the piece</li>
                <li>download audio for each word from the google text-to-speech API</li>
                <li>
                    use the{' '}
                    <Link href="https://montreal-forced-aligner.readthedocs.io/en/latest/">
                        Montreal Forced Aligner
                    </Link>{' '}
                    to detect phoneme boundaries in each word
                </li>
                <li>send a recipe to Matlab containing each word, along with pitches and durations for constructing the song</li>
            </OL>
            <P>
                At this point, Matlab takes over and splices all of the words together according to the recipe, while also autotuning each word. This part
                was performed in Matlab as it had better tools for quickly writing an autotuner, including pitch detection, pitch shifting, and very robust
                tools for working with audio data in general.
            </P>
            <P>
                The output of this whole process sounds about how you&apos;d expect autotuned text-to-speech to sound&mdash;my favorite reaction was that it
                sounded like a choir of demon chipmunks.
            </P>
            <AudioGrid
                title="Examples"
                clips={[
                    { label: 'Hark the Herald Angels Sing - Felix Mendelssohn', src: hark_the_herald },
                    { label: 'Christmas Time is Here - arr. David Samson', src: christmas_time },
                    
                    { label: 'Brother John - Folk Song', src: brother_john },
                    { label: 'When David Heard - Eric Whitacre (intro only)', src: when_david_heard },
                    
                    { label: 'Sanctus (London) - Ola Gjeilo (intro only)', src: sanctus },
                    { label: 'Upon the Hearth - Matthew Samson', src: upon_the_hearth },
                ]}
            />
            <P>
                As usual, accurate pitch detection was the biggest problem I had to deal with (runner up being phoneme segmenting). I&apos;m always
                surprised by how difficult such a simple sounding problem always turns out to be&mdash;in this case though, I think the out-of-tune-ness of
                it is quite in line with the quality of the rest of the result.
            </P>
            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon='github'>
                        <Link href="https://github.com/david-andrew/Ensemble">Github Repo</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default Page;