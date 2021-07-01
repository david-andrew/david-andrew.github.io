import React from 'react'
import { PageContainer, PageHeading } from '../../Components'
import { ExternalLink } from '../../utilities'

export const Composer = (): JSX.Element => {
    return (
        <>
            <PageContainer>
                <PageHeading />
                <p>
                    Composer is a web-based music entry application I am developing with my brother. Composer is still very early in the design process, but the
                    goal is to create the most seamless experience for getting music onto the page. Initially, Composer will be a front end for{' '}
                    <ExternalLink href="http://lilypond.org/">LilyPond</ExternalLink>, i.e. Composer will produce the source music code that gets compiled by
                    LilyPond and output as a PDF. Composer is a competitor to other music notation software such as{' '}
                    <ExternalLink href="https://www.finalemusic.com/">Finale</ExternalLink>,{' '}
                    <ExternalLink href="https://new.steinberg.net/dorico/">Dorico</ExternalLink>,{' '}
                    <ExternalLink href="https://www.avid.com/sibelius">Sibelius</ExternalLink>, and{' '}
                    <ExternalLink href="https://musescore.org/en">MuseScore</ExternalLink>.
                </p>
            </PageContainer>
        </>
    )
}
