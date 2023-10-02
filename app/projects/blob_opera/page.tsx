"use client"
import YouTube from 'react-youtube'
import { P, H1, H3, Divider, Link } from '@/app/(components)/ui'


const Page = (): JSX.Element => {
    return (
        <>
            <P>
                While working on my <Link href="/projects/so_voice">choral music synthesis engine</Link>, so voice!, Google Arts &amp; Culture
                Experiments released a fun little project called{' '}
                <Link href="https://artsandculture.google.com/experiment/blob-opera/AAHWrq360NcGbw">Blob Opera</Link>. My brother and I
                recognized that the so voice! back end would be perfect for reading in sheet music which could then be piped into the Blob Opera, and so we
                hacked together a hilarious synthesis engine. Most of the code was already written, but I handled all new code, while my brother handled
                producing suitable MusicXML files that the so voice! engine could handle. Music is then{' '}
                <Link href="https://github.com/OverlappingElvis/blob-opera-midi#sideloading-the-json-file">side loaded</Link> into Blob
                Opera, 4 voices at a time, and recorded.
            </P>
            <H3>When David Heard - Eric Whitacre</H3>
            {/* TODO: find a proper react component for soundcloud */}
            <iframe
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1059273385&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false"
            />
            <Divider />
            <H3>Nox Arumque - Eric Whitacre</H3>
            <YouTube videoId="RTEZeaxUP2U" opts={{ width: '100%' }} />
            <Divider />
            <H1>Coming Soon™</H1>
            <H3>Seek Him that Maketh the Seven Stars - Jonathan Dove</H3>
            <H3>Duel of the Fates - John Williams</H3>
        </>
    )
}


export default Page;