import { P, Link, H3 } from "@/app/(components)/ui";
import { IconBullet, IconBulletList } from "@/app/(components)/icon_bullet";

const Page = (): JSX.Element => {
    return (
        <>
            <P>
                uSkipSpoilers is a small chrome extension I made mostly as a joke for my brother who is extremely spoiler averse. Beyond that, my goal was
                to gain experience developing browser extensions which would help me to build more in the future.
            </P>
            <P>
                uSkipSpoilers allows you to tag sections of a YouTube video as &quot;Spoilers&quot; and then during video playback, it will hide those
                portions of the video. Spoiler boundaries are saved to the video URL which can then be easily shared with someone else who has the
                extension. So for example, say I want to send a youtube video to my brother about a something, but I notice it contains spoilers for a movie
                he is planning to watch, I can annotate the spoiler timestamps in the extension, and then send the custom link with the annotations, and
                then he can watch without worry.
            </P>
            <H3>Try It</H3>
            <IconBulletList>
                <IconBullet icon="chrome">
                    <Link href="https://chrome.google.com/webstore/detail/uskipspoilers/gahcifkbhfpglehmpapbhcafiailckcd">
                        uSkipSpoilers Chrome Extension
                    </Link>
                </IconBullet>
            </IconBulletList>
            <H3>Github</H3>
            <IconBulletList>
                <IconBullet icon="github">
                    <Link href="https://github.com/david-andrew/uSkipSpoilers">uSkipSpoilers git repo</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default Page;
