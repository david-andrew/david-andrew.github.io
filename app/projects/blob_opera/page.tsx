"use client"
import YouTube from 'react-youtube'
import Link from 'next/link'
import { Divider } from '@/app/(components)/ui'
import { meta } from './meta'


import { ProjectMeta } from '../types'
const PageHeading = ({meta}:{meta:ProjectMeta}): JSX.Element => {
    return (
        <>
            <h1 className="pt-8 text-4xl font-quadon">{meta.title}</h1>
            <p>&lt;TODO: get timestamp&gt;</p>
            <br/>
        </>
    );
}
export const Page = (): JSX.Element => {
    return (
        <>
            {/* TODO: pull title automatically somehow... */}
            <PageHeading meta={meta} />

            <p>
                While working on my <Link href="/projects/so_voice">choral music synthesis engine</Link>, so voice!, Google Arts &amp; Culture
                Experiments released a fun little project called{' '}
                <Link href="https://artsandculture.google.com/experiment/blob-opera/AAHWrq360NcGbw">Blob Opera</Link>. My brother and I
                recognized that the so voice! back end would be perfect for reading in sheet music which could then be piped into the Blob Opera, and so we
                hacked together a hilarious synthesis engine. Most of the code was already written, but I handled all new code, while my brother handled
                producing suitable MusicXML files that the so voice! engine could handle. Music is then{' '}
                <Link href="https://github.com/OverlappingElvis/blob-opera-midi#sideloading-the-json-file">side loaded</Link> into Blob
                Opera, 4 voices at a time, and recorded.
            </p>
            <br/>
            <h3 className='text-2xl font-quadon'>When David Heard - Eric Whitacre</h3>
            <iframe
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1059273385&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false"
            />
            <Divider />
            <h3 className='text-2xl font-quadon'>Nox Arumque - Eric Whitacre</h3>
            <YouTube videoId="RTEZeaxUP2U" opts={{ width: '100%' }} />
            <Divider />
            <h1>Coming Soon™</h1>
            <h3>Seek Him that Maketh the Seven Stars - Jonathan Dove</h3>
            <h3>Duel of the Fates - John Williams</h3>
        </>
    )
}


export default Page;