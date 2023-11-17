import { Link, H3, P } from "@/app/(components)/ui";
import { YouTube } from "@/app/(components)/youtube";
import { IconBullet, IconBulletList } from "@/app/(components)/icon_bullet";

const Page = (): JSX.Element => {
    return (
        <>
            <P>
                Rewind was a video game I developed on a team of five as the capstone project to Video Game Design (EN.601.355). The game is a top down 2D
                bullet-hell dungeon crawler, similar to{' '}
                <Link href="https://store.steampowered.com/app/311690/Enter_the_Gungeon/">Enter the Gungeon</Link>, or{' '}
                <Link href="https://store.steampowered.com/app/603960/Monolith/">Monolith</Link>, but with a time-travel twist. Every time
                you enter a room, time resets to midnight, and all your past selves are running around and shooting, adding another obstacle that you have
                to avoid (or cleverly use to your advantage).
            </P>
            <P>
                For the most part, I focused on sound design, while also handling a bit of animation and general programming work, and the overall
                narrative/story. I composed the entire soundtrack for the game, and sourced all sound effects. Additionally, I built the sound engine
                responsible for playing sounds and music at the correct time. Other than sound and story, I, along with everyone else on the team, did a
                large amount of play testing and bug fixing during development.
            </P>
            <P>
                By the end of the class, we had a solid prototype that was maybe 80% of the way to a polished sellable game, but no work has been done
                since.
            </P>
            <H3>Video</H3>
            <P>
                This is a live stream playthrough my brother put together for the game. Some parts of the stream are a bit choppy, but overall, it&apos;s a
                good demo for the game.
            </P>
            <YouTube videoId="KlFp6GHRjoU" start={111}/>
            <H3>Try It</H3>
            <P>
                Controls: WASD to move, arrow keys to shoot. The Windows version historically has been the most stable, and works great with{' '}
                <Link href="https://www.winehq.org/">Wine</Link>
            </P>
            <IconBulletList>
                <IconBullet icon="linux">
                    <Link href="/docs/rewind/Rewind_Linux.zip">Rewind (Linux)</Link>
                </IconBullet>
                <IconBullet icon="windows">
                    <Link href="/docs/rewind/Rewind_Windows.zip">Rewind (Windows)</Link>
                </IconBullet>
                <IconBullet icon="apple">
                    <Link href="/docs/rewind/Rewind_Mac.zip">Rewind (Mac)</Link>
                </IconBullet>
            </IconBulletList>
            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon="object group">
                    <Link href="/docs/rewind/gooberz-gold.pdf">Final Presentation</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default Page;
