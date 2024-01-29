import { Link, H3, P } from '@/app/(components)/ui'
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet'
import { CodeBlock } from '@/app/(components)/syntax'
import { Collage } from '@/app/(components)/collage'
import { getImages } from '@/app/projects/fetch'

const Page = async (): Promise<JSX.Element> => {
    const images = await getImages('nand2tetris')
    return (
        <>
            <P>
                <Link href="https://www.nand2tetris.org/">From NAND to Tetris</Link> is a course that teaches the
                fundamentals of computer architecture by building a computer from the ground up. The course starts with
                NAND gates (simulated in a hardware emulator), and progresses through the construction of a full
                computer system, including a CPU, memory, and ultimately an operating system capable of running a
                program such as Tetris. I&apos;ve always had a passing interest in computer architecture (especially
                since it&apos;s closely related to{' '}
                <Link href="/projects/dewy">my passion of programming language design</Link>), and I finally got around
                to completing the course, which was a ton of fun! This page is mainly to link to my solutions for each
                of the course&apos;s projects.
            </P>
            <H3>Tetris</H3>
            <P>Here&apos;s a few shots of my Tetris implementation.</P>
            <Collage images={images} />
            <P>
                It doesn&apos;t have any bells or whistles, but it works! If you wish to play it, you&apos;ll have to
                download the project and course materials, and run it with the VMEmulator.
            </P>
            <CodeBlock
                language="bash"
                code={`git clone git@github.com:david-andrew/nand2tetris.git
cd nand2tetris
unzip nand2tetris.zip

# compile the tetris project
bash nand2tetris/tools/JackCompiler.sh projects/9/Tetris

# run the emulator
bash nand2tetris/tools/VMEmulator.sh
`}
            />
            <P>
                Then load and run the Tetris directory in the emulator. Only controls are left/right to move, and
                up/down to rotate.
            </P>
            <P>
                I&apos;m looking into getting it to run directly on this page, but it&apos;ll probably involve running
                Java with WebAssembly, which seems pretty non-trivial, so TBD.
            </P>
            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon="github">
                    <Link href="https://github.com/david-andrew/nand2tetris">Github Repo</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default Page
