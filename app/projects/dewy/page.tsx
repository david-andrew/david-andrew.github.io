import { Link, H3, P } from '@/app/(components)/ui'
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet'

const page = (): JSX.Element => {
    return (
        <>
            <P>
                Dewy is a general purpose programming language I have been developing with engineering applications in
                mind. The main compiler is currently being rewritten from scratch. More details on new developments
                coming soon&trade;.
            </P>
            <P>
                In the meantime, the bootstrapping subset lives on the <Link href="/projects/udewy">μDewy</Link> page,
                and a frozen snapshot of the old online interpreter is available at{' '}
                <Link href="/projects/dewy_2025">Dewy (2025 Snapshot)</Link>.
            </P>
            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon="github">
                    <Link href="https://github.com/david-andrew/dewy-lang">Github Repo</Link>
                </IconBullet>
                <IconBullet icon="docs">
                    <Link href="https://david-andrew.github.io/dewy-lang/">Language Docs</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default page
