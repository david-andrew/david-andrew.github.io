import { Link, H3, P } from '@/app/(components)/ui'
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet'

const page = (): JSX.Element => {
    return (
        <>
            <P>
                Timbre comes from the overtones stacked on a fundamental, and those overtones come from the shape of the
                space the instrument vibrates in. I thought it would be cool to make a small web demo that lets you hear
                what instruments in different dimensions sound like.
            </P>
            <P>
                At 1D you get the harmonic series. At 2D you get the ragged ladder of a drumhead. By 4D or 5D so many
                modes crowd into the first couple of octaves that the tone turns into a gong or a wash. The app also
                supports changing the shape of the instrument between an N-dimensional box (edges and corners) and an
                N-dimensional ball (round, no corners).
            </P>
            <P>The live demo is embedded below. Headphones recommended.</P>
            <P>
                <iframe
                    src="https://david-andrew.github.io/fractal_tones/"
                    className="w-full h-[35em] outline"
                    title="Fractal Tones"
                />
            </P>
            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon="chrome">
                    <Link href="https://david-andrew.github.io/fractal_tones/">Live Demo</Link>
                </IconBullet>
                <IconBullet icon="github">
                    <Link href="https://github.com/david-andrew/fractal_tones">Github Repo</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default page
