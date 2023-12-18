import { P, Link, UL, H3 } from '@/app/(components)/ui'
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet'

const Page = (): JSX.Element => {
    return (
        <>
            <P>
                This website was made using <Link href="https://nextjs.org">Next.js</Link> and{' '}
                <Link href="https://tailwindcss.com">Tailwind CSS</Link>. It is statically hosted on{' '}
                <Link href="https://pages.github.com">Github Pages</Link> with automatic build/deployment via Github
                Actions on push to master. Other notable technologies used include:
            </P>
            <UL>
                <li>
                    <Link href="https://pyodide.org/en/stable/">Pyodide</Link>. Used to host the{' '}
                    <Link href="/projects/dewy">Dewy compiler demo</Link> written python
                </li>
                <li>
                    <Link href="https://emscripten.org/">Emscripten</Link>. Used to host the{' '}
                    <Link href="/projects/dewy_old">SRNGLR parser demo</Link> written in C
                </li>
            </UL>
            <H3>Source Code</H3>
            <IconBulletList>
                <IconBullet icon="github">
                    <Link href="https://github.com/david-andrew/david-andrew.github.io">github repo</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default Page
