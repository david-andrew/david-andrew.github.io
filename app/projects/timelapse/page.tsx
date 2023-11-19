import { P, Link, Divider, H3 } from "@/app/(components)/ui";
import { IconBullet, IconBulletList } from "@/app/(components)/icon_bullet";
import { YouTube } from "@/app/(components)/youtube";

const Page = (): JSX.Element => {
    return (
        <>
            <P>
                One of my more recent hobbies has been making timelapses of clouds. I like to think that someday I&apos;ll use these videos as reference
                material for several of my games, like <Link href="/projects/mehve">Mehve</Link>, but for now I&apos;m content to just enjoy
                them as cool videos.
            </P>
            <P>
                To make a timelapse, I have a Raspberry Pi connected to a fixed webcam looking out the window. The Pi is running a simple python script I
                wrote that takes the sequence of images in the timelapse, and saves them to a prespecified location&mdash;a very large hard drive in my
                case. For recording images, I generally use an{' '}
                <Link href="https://en.wikipedia.org/wiki/Moving_average#Exponential_moving_average">
                    exponentially weighted moving average
                </Link>{' '}
                over all previous images, which helps smooth out noise in the output image. I then have a second python script which stitches the images
                together into a video for playback.
            </P>
            <H3>Videos</H3>
            <YouTube videoId="KeTi_bErBwM"/>
            <Divider />
            <YouTube videoId="51689ykLVWU"/>
            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon="github">
                    <Link href="https://github.com/david-andrew/timelapse">Project Repo</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default Page;
