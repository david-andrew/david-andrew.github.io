import { getImages } from '@/app/projects/fetch'
import { Link, P, H3, UL } from '@/app/(components)/ui'
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet'
import { Collage } from '@/app/(components)/collage'

const Page = async (): Promise<JSX.Element> => {
    const images = await getImages('silver_void')

    return (
        <>
            {/* TODO: put html5 demo here */}
            <P>
                Silver Void was my submission to <Link href="https://itch.io/jam/acerola-jam-0">Acerola Jam 0</Link>.
                Participants had 2 weeks to solo create a game on the theme &quot;Aberration&quot;, as in a departure
                from what is normal, usual, or expected. Initially I wanted to make a time loop game, sort of like
                Groundhog Day or Re:Zero, but quickly determined that even with 2 weeks, the scope was too large. So I
                settled on making a realistic 3D space simulator, where the player takes part in a fleet battle. This
                fits the theme in that the enemies continually predict where the player will be based on current
                position and velocity, and so the player needs to continually thrust and change trajectories (i.e. make
                an aberration from their current path) to avoid being hit.
            </P>
            <P>
                Usually I approach game making as an art form, and for this jam, I feel I was really channelling The
                Fountain crossed with The Expanse. The player is fighting in a grand ship to ship battle much like those
                in The Expanse, but the zoomed out scale, somber piano, and backdrop of the Milky Way all add to a
                feeling of futility and poignancy, much like The Fountain. Ultimately there is no winning, and the game
                continues on forever, even if the player dies.
            </P>
            <H3>Photos</H3>
            <Collage images={images} rowSizes={[2, 3]} />
            <H3>Technical</H3>
            <P>
                All assets except the milky way image (public domain here:{' '}
                <Link href="https://commons.wikimedia.org/wiki/File:ESO_-_Milky_Way.jpg">ESO - Mikly Way</Link>) were
                made by me. Sound effects are pot and pan recordings layered/edited in audacity, and the soundtrack is
                piano improv recorded with my phone. There&apos;s not much art to speak of, as ships, bullets, and
                explosions are all just simple polygons combined into slightly more complex shapes. The game itself was
                made in the Godot game engine
            </P>
            <H3>Cut Features</H3>
            <P>
                Lots of things had to be cut. Initially when I was building the ships, I was imagining fleet battles
                more like those from Legend of the Galactic Heroes, i.e. long range laser battles with shields. The game
                actually even has a hidden laser beam you can switch to, but as time was running low I trimmed it down
                to a more core experience. Some other notable cuts included:
            </P>
            <UL>
                <li>different sized ships</li>
                <li>fully remappable/customizable controls</li>
                <li>
                    lasers and shields which draw power from power modules. The lasers would need to store power in
                    capacitor modules before being able to fire
                </li>
                <li>menu for changing settings like volume</li>
                <li>
                    shader for giving a sense of your absolute velocity (e.g. a faint grid showing the underlying
                    coordinate system as you fly around)
                </li>
                <li>
                    I actually had initially thought of having a mechanic where the player could pause time, and they
                    would use that to change the tide of battle. It was my first take on the theme, but it fell way out
                    of scope.
                </li>
                <li>
                    some sort of target system or reticule that show you where to point to hit a moving enemy in 3D
                    space
                </li>
                <li>better fleet behavior</li>
            </UL>
            {/* <H3>Try It</H3> */}
            {/* <IconBulletList>
                <IconBullet icon="chrome">
                    <Link href="https://david-andrew.github.io/silver_void_webgl/">Silver Void (web)</Link>
                </IconBullet>
                <IconBullet icon="linux">
                    <Link href="https://github.com/david-andrew/escort_mission_2020/releases/download/0.5.0/linux_0_5_0.zip">
                        Silver Void 0.1.7 (linux)
                    </Link>
                </IconBullet>
                <IconBullet icon="windows">
                    <Link href="https://github.com/david-andrew/escort_mission_2020/releases/download/0.5.0/windows_0_5_0.zip">
                        Silver Void 0.1.7 (windows)
                    </Link>
                </IconBullet>
                <IconBullet icon="apple">
                    <Link href="https://github.com/david-andrew/escort_mission_2020/releases/download/0.5.0/mac_0_5_0.zip">
                        Silver Void 0.1.7 (mac)
                    </Link>
                </IconBullet>
            </IconBulletList> */}

            <br />
            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon="gamepad">
                    <Link href="https://itch.io/jam/acerola-jam-0/rate/2557875">Jam Submission Page</Link>
                </IconBullet>
                <IconBullet icon="gamepad">
                    <Link href="https://dsamson.itch.io/silver-void">Itch.io Game Page</Link>
                </IconBullet>
                <IconBullet icon="github">
                    <Link href="https://github.com/david-andrew/SilverVoid">Github Repo</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default Page
