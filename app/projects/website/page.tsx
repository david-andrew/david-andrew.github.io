import { P, Link } from "@/app/(components)/ui";
import { IconBullet, IconBulletList } from "@/app/(components)/icon_bullet";

const Page = (): JSX.Element => {
    return (
        <>
            <P>
                This website was made using <Link href="https://nextjs.org">Next.js</Link> and <Link href="https://tailwindcss.com">Tailwind CSS</Link>.
            </P>
            <IconBulletList>
                <IconBullet icon="github">
                    <Link href="https://github.com/david-andrew/david-andrew.github.io">github repo</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default Page;