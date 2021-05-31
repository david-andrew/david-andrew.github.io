import React from 'react'
import { PageContainer, PageHeading } from '../../Components'
import { Link } from 'react-router-dom'
import { ExternalLink } from '../../utilities'
import Youtube from 'react-youtube'

export const BlobOpera = (): JSX.Element => {
    return (
        <>
            <PageContainer>
                <PageHeading title="Blob Opera Performance" subtitile="February 2021" />
                <p>
                    While working on my <Link to="/projects/ensemble">choral music synthesis engine</Link>, Google Arts &amp; Culture Experiments released a fun
                    little project called <ExternalLink href="https://artsandculture.google.com/experiment/blob-opera/AAHWrq360NcGbw">Blob Opera</ExternalLink>.
                    My brother and I recognized that the back end of Ensemble would be perfect for reading in sheet music which could then be piped into the
                    Blob Opera, and so we hacked together a hilarious synthesis engine. Most of the code was already written, but I handled all new code, while
                    my brother handled producing suitable MusicXML files that the Ensemble engine could handle.
                </p>
                <h3>When David Heard - Eric Whitacre</h3>
                <iframe
                    width="100%"
                    height="166"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1059273385&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false"
                ></iframe>
                <h3>Nox Arumque - Eric Whitacre</h3>
                <Youtube videoId="RTEZeaxUP2U" opts={{ width: '100%' }} />
                <h3>Duel of the Fates - John Williams</h3>
                <p>Coming Soon. Will incorperate both Blob Opera, and Note Performer for synthesis.</p>
            </PageContainer>
        </>
    )
}
