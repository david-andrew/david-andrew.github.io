import { Link, H3, P } from '@/app/(components)/ui'
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet'
import { YouTube } from '@/app/(components)/youtube'

const page = (): JSX.Element => {
    return (
        <>
            <P>
                For the <Link href="https://itch.io/jam/gmtk-2026">2026 GMTK Game Jam</Link> took another stab at my
                paper airplane folding simulator from <Link href="/projects/dropfold">the 2024 jam</Link>. You can fold
                an entire paper airplane, and I added a physics system to let you throw and fly it. In terms of
                gameplay, I turned it into a golf game where your goal is to throw your airplane to the goal in as few
                throws as possible.
            </P>
            <P>
                Touchscreen is highly recommended, and it can be played on a phone. Folding is swipe-from-an-edge for
                flat folds, with a separate 2D/3D mode for opening a fold into space (e.g. for wings).
            </P>
            <P>
                <iframe
                    src="https://david-andrew.github.io/10_fold_demo"
                    className="w-full h-[35em] outline"
                    title="Paper Golf"
                />
            </P>
            <H3>Soundtrack</H3>
            <P>The soundtrack is just a simple repeating progression I recorded on a piano.</P>
            <YouTube videoId="lzhWaFDbE4s" />
            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon="cubes">
                    <Link href="https://dsamson.itch.io/paper-golf-all-out-world-extravaganza">
                        Jam Submission (itch.io)
                    </Link>
                </IconBullet>
                <IconBullet icon="chrome">
                    <Link href="https://david-andrew.github.io/10_fold_demo">Full Page Demo</Link>
                </IconBullet>
                <IconBullet icon="gamepad">
                    <Link href="/projects/dropfold">Earlier Paper Folding Simulator</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default page
