import { Link, H3, P } from '@/app/(components)/ui'
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet'
import { CodeBlock, Code } from '@/app/(components)/syntax'

const page = (): JSX.Element => {
    return (
        <>
            <P>
                In my spare time, I&apos;ve been creating the world for a series of stories I&apos;m writing. In order
                to support keeping track of historical events in my world, I built a small app that lets you create and
                document timelines, visually display them, and let you edit them. It backs up your work to a plain
                markdown file, making it super convenient for saving to git, or migrating to a different system.
            </P>
            <P>
                The backing file format is simple: each top-level heading is a timeline, <Code code="##" /> headings are
                events or spans, and metadata lives on <Code code=">" /> lines. Dates go in brackets; a span is{' '}
                <Code code="[start .. end]" />:
            </P>
            <CodeBlock
                code={`\
# Earth 21st century
> id=CE
> epoch=2025

## [2025-07-13] Second contact
A faint repeating pulse is picked up by the array.

## [2026 .. 2030-10] The Quiet Years
> color=green

A long period of preparation and uncertainty.
`}
            />
            <P>A hosted copy of the app is embedded below:</P>
            <P>
                <iframe
                    src="https://david-andrew.github.io/epochlore/"
                    className="w-full h-[35em] outline"
                    title="Epochlore"
                />
            </P>
            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon="chrome">
                    <Link href="https://david-andrew.github.io/epochlore/">Live App</Link>
                </IconBullet>
                <IconBullet icon="github">
                    <Link href="https://github.com/david-andrew/epochlore">Github Repo</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default page
