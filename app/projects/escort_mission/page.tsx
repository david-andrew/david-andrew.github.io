import { getImages } from '@/app/projects/fetch'
import { Link, P, H3 } from "@/app/(components)/ui";
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet';
import { YouTube } from "@/app/(components)/youtube";
import { Collage } from "@/app/(components)/collage";



const Page = async (): Promise<JSX.Element> => {
    const images = await getImages('escort_mission')

    return (
        <>
            <P>
                Escort Mission was my and my brother&apos;s submission for the{' '}
                <Link href="https://itch.io/jam/gmtk-2020">GMTK Game Jam 2020</Link>. The theme of the jam was &quot;Out of Control&quot;,
                as fun play on the out of control feeling present in the thick of the worldwide pandemic. The entire game was created from scratch during
                the 48 hour-long game jam.
            </P>
            <P>
                For our game, we wanted it to feel like the player was managing too many things leading to that feeling of out of control. After much
                brainstorming, we landed on the concept of sheep herding, where you control sheep dogs, and have to guide non-cooperative sheep away from
                danger, and towards the goal. And to make it feel extra <em>out of control</em>, we gave the player simultaneous control of 4 dogs. As the
                player progresses, obstacles become more difficult to manuever around, and adversarial wolves show up and attempt to eat the sheep.
            </P>
            <P>
                Early on, I decided that we would make the game in the Godot game engine&mdash;I was turned off of Unity3D from{' '}
                <Link href="/projects/boat_simulator">past</Link> <Link href="/projects/rewind">experiences</Link> with it, and
                had been hearing only good things about the new Godot engine. For the game jam, my brother handled all art related aspects (sprites,
                backgrounds, music, sound effects, etc.), while I handled coding the game itself. Mechanically the game is super simple: sheep use the{' '}
                <Link href="https://eater.net/boids">Boids Algorithm</Link> to wander around the screen, while each of the player controlled
                dogs exert a repulsive force on nearby sheep. The enemy wolf AI is literally just{' '}
                <em>walk in a circle until a sheep is nearby, and then chase/attempt to eat it</em>. The player also applies a repulsive force to the
                wolves, which allows them to protect sheep in danger.
            </P>
            <H3>Photos</H3>
            <Collage images={images}/>
            <H3>Gameplay Video</H3>
            <P>After submissions were closed, we were lucky enough to have a streamer feature our game</P>
            <YouTube videoId="NSteCRVER3A" opts={{ width: '100%', playerVars: { start: 10, end: 125 } }} />
            <br/>
            <H3>Try It</H3>
            <IconBulletList>
                <IconBullet icon='linux'>
                    <Link href="https://github.com/david-andrew/escort_mission_2020/releases/download/0.5.0/linux_0_5_0.zip">
                        escort mission 0.5.0 (linux)
                    </Link>
                </IconBullet>
                <IconBullet icon='windows'>
                    <Link href="https://github.com/david-andrew/escort_mission_2020/releases/download/0.5.0/windows_0_5_0.zip">
                        escort mission 0.5.0 (windows)
                    </Link>
                </IconBullet>
                <IconBullet icon='apple'>
                    <Link href="https://github.com/david-andrew/escort_mission_2020/releases/download/0.5.0/mac_0_5_0.zip">
                        escort mission 0.5.0 (mac)
                    </Link>
                </IconBullet>
            </IconBulletList>

            <br/>
            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon='gamepad'>
                    <Link href="https://itch.io/jam/gmtk-2020/rate/696988"> GMTK Submission Page </Link>
                </IconBullet>
                <IconBullet icon='gamepad'>
                    <Link href="https://dsamson.itch.io/escort-mission-2020"> Itch.io Game Page</Link>
                </IconBullet>
                <IconBullet icon='github'>
                    <Link href="https://github.com/david-andrew/escort_mission_2020"> Github Repo</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default Page;
