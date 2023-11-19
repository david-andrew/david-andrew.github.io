import { P, H3, Link } from "@/app/(components)/ui";
import { Collage } from "@/app/(components)/collage";
import { IconBullet, IconBulletList } from "@/app/(components)/icon_bullet";
import { getImages } from "@/app/projects/fetch";

const Page = async (): Promise<JSX.Element> => {
    const images = await getImages('ziggy_v');
    return (
        <>
            <P>
                For a long time, my brother was been wanting to make a game that merges the First Person Shooter (FPS) genre with Real Time Strategy (RTS).
                Ziggy V is our initial attempt to build a simple prototype meant to demonstrate the viability of the concept.
            </P>
            <H3>Concept</H3>
            <P>
                The concept is basically a RTS game where the player commands units around a map to perform objectives against an opponent, but instead of
                AI controlled units (like normal RTS games) each unit is controlled by a real player, playing in FPS mode. This is meant to create more
                strategy and tactical elements in the first person shooter play, overall giving battles more depth.
            </P>
            <H3>Prototype</H3>
            <P>
                So far, as we were starting to build out a rudimentary first person shooter game to scaffold off of, I noticed a couple interesting features
                that pointed towards fun gameplay concepts. Players play as a physically simulated cube that can run around the map and shoot a rifle. The
                player physics are much less realistic and more akin to the floaty jumping and movement one might find in a Mario game&mdash;this actually
                felt surprisingly fun to play on the test level. Additionally the other interesting feature is that of slow bouncing bullets. Each bullet
                the characters shoot is physically simulated, flies at a relatively slow (but visibly fast) velocity, and has a highly visible mesh. This
                gives a really interesting style to them, and makes them almost feel like tracer rounds as they fly across the map. While implementing the
                bullet physics, I happened to set them to bounce off of surfaces, which introduced the very fun concept of bouncing bullets.
            </P>
            <Collage images={images} />
            <P>
                With just these few mechanics on a test level, the demo is still quite fun to mess around with (especially bouncing bullets off of various
                surfaces). But for now the project is on hold until we both have more time to devote to it.
            </P>
            <H3>Try It</H3>
            <IconBulletList>
                <IconBullet icon="linux">
                    <Link href="/docs/ziggy_v/ziggy_v_linux.zip">Ziggy V (Linux)</Link>
                </IconBullet>
                <IconBullet icon='windows'>
                    <Link href="/docs/ziggy_v/ziggy_v_windows.zip">Ziggy V (Windows)</Link>
                </IconBullet>
                <IconBullet icon='apple'>
                    <Link href="/docs/ziggy_v/ziggy_v_mac.zip">Ziggy V (Mac)</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default Page;
