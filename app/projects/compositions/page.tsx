"use client";
import YouTube from "react-youtube";
import { Link, Divider, P, H3 } from "@/app/(components)/ui";

const Page = (): JSX.Element => {
    return (
        <>
            <P>
                These are two pieces I composed for my high school choir, and was able to get good recordings of. I also have several other unrecorded
                pieces, which I&apos;m hoping to add here once <Link href="/projects/so_voice">so voice!</Link> is able to produce good enough
                recordings.
            </P>
            <H3>Deep Field</H3>
            <P>CB West Chamber Choir - Trinity Cathedral, Trenton NJ, 2015</P>
            <YouTube videoId="4WJfvuVrqfA" opts={{ width: '100%' }} />
            <Divider />
            <H3>Invictus</H3>
            <P>CB West Men&apos;s Ensemble - Main St Baptist Church, Doylestown PA, 2014</P>
            <YouTube videoId="EcNoVvlkyM8" opts={{ width: '100%' }} />
        </>
    )
}

export default Page;