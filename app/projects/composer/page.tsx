import { Link, P } from '@/app/(components)/ui'

const Page = (): JSX.Element => {
    return (
        <P>
            Composer is a web-based music entry application I am developing with my brother. Composer is still very
            early in the design process, but the goal is to create the most seamless experience for getting music onto
            the page. Initially, Composer will be a front end for <Link href="http://lilypond.org/">LilyPond</Link>,
            i.e. Composer will produce the source music code that gets compiled by LilyPond and output as a PDF.
            Composer is a competitor to other music notation software such as{' '}
            <Link href="https://www.finalemusic.com/">Finale</Link>,{' '}
            <Link href="https://new.steinberg.net/dorico/">Dorico</Link>,{' '}
            <Link href="https://www.avid.com/sibelius">Sibelius</Link>, and{' '}
            <Link href="https://musescore.org/en">MuseScore</Link>.
        </P>
    )
}

export default Page
