import { Link, H3, P, UL } from '@/app/(components)/ui'
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet'
// import { CodeBlock, Code } from '@/app/(components)/syntax'

const page = (): JSX.Element => {
    return (
        <>
            <P>
                For the <Link href="https://itch.io/jam/gmtk-2024">2024 GMTK Game Jam</Link>, I decided I wanted to make
                a game about folding paper. The idea was that you would start with a piece of paper and make up to 10
                folds to create a paper airplane which would then be thrown. There was then going to be a little physics
                simulation of the flight, and players would be scored on how well theirs flew. Suffice to say, I was
                overscoped for the 48 hour jam, as we are all wont to do.
            </P>
            <P>
                It&apos;s written in pure typescript with <Link href="https://vite.dev/">Vite</Link> for the bundler and{' '}
                <Link href="https://threejs.org/">THREE.js</Link> for the 3D stuff. During the jam, I was able to get a
                single white sheet of paper to make a single fold. People found it surprisingly addictive, and I ended
                up in the top third of games in the jam. After the jam I cleaned it up and developed a bit more.
                Here&apos;s a demo:
            </P>
            <P>
                <iframe src="https://david-andrew.github.io/dropfold" className="w-full h-[35em] outline" />
            </P>
            <P className="mb-2">
                This version includes several improvements over the{' '}
                <Link href="https://dsamson.itch.io/1foldsim">original submission</Link>:
            </P>
            <UL>
                <li>better click location detection (e.g. can drag off the edge)</li>
                <li>shader textures for the paper</li>
                <li>support for touch screens</li>
                <li>lots of backend cleanup, e.g. initial support for fold obstacles</li>
            </UL>
            <P>
                This demo is also what&apos;s powering my <Link href="/contact">Contact</Link> page. I added support for
                text/icons via a Multi-channel Signed Distance Fields (MSDF) shader and then hooked up a few small
                conveniences like matching the back to the selected accent color, or automatically zooming to fit the
                window.
            </P>
            <P>
                Unfortunately for now the project is on hold. It turns out dealing with multiple folds is exponentially
                more complex than just a single one. The main culprit is dealing figuring out which paper sections
                (facets) participate in the fold, and any obstacles that prevent a fold from passing some point. The
                number of different cases to handle has thus far been out of my reach.{' '}
                <b>
                    If you are familiar with computational origami and how it might apply here, please contact me!
                    I&apos;d love to pick your brain!
                </b>
            </P>
            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon="github">
                    <Link href="https://github.com/david-andrew/dropfold">Github Repo</Link>* Warning: the codebase is
                    pretty messy and prototype-y
                </IconBullet>
                <IconBullet icon="cubes">
                    <Link href="https://dsamson.itch.io/1foldsim">Original Jam Submission</Link>
                </IconBullet>
                <IconBullet icon="cubes">
                    <Link href="https://david-andrew.github.io/dropfold">Latest Demo (Full Page)</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default page
