import React from 'react'
import { Link } from 'react-router-dom'
import { PageContainer, PageHeading } from '../../Components'
import { ExternalLink } from '../../utilities'
import ReactAudioPlayer from 'react-audio-player'
// import atma16000 from '../../audio/so_voice/atma16000.mp3'
// import atma16000 from '../../audio/so_voice/atma16000.wav'
// import atma16000resynth from '../../audio/so_voice/atma16000resynth.wav'

export const SoVoice = (): JSX.Element => {
    return (
        <>
            <PageContainer>
                <PageHeading title="so voice!" subtitle="January 2021" />
                <p>
                    so voice! is the spiritual successor to my <Link to="/projects/musical_dl">Deep Learning Capstone Project</Link>. The goal is to develop a
                    choir synthesizer that leverages deep learning to produce audio that is indistinguishable from real recordings.
                </p>
                <h3>Method</h3>
                <p>
                    Since I intend to commercialize so voice! in the near future, I wont&apos;t go into too much detail about the inner workings on here. But at
                    a high level, so voice! consists of two main parts: the parsing engine, and the synthesizer. The parsing engine reads in sheet music,
                    currently from well formed (read curated) MusicXML files, and converts them to a serial representation that can be fed into a machine
                    learning pipeline. The synthesizer then pipes that representation through a series of deep learning models which ultimately output an audio
                    file that is the synthesized performance of the input. Eventually I&apos;d also like to add in a machine learning pipeline for reading sheet
                    music from images (e.g. PDFs).
                    <br />
                    <br />
                    In terms of the actual machine learning pipeline, I have been developing custom architectures ever since I started working on the project in
                    early 2019. Initially I centered my design around the WaveNet, which Google uses for their Text-to-Speech engine, however several
                    compounding factors cause WaveNets to be unsuitable for choral voice synthesis. More recently a{' '}
                    <ExternalLink href="https://magenta.tensorflow.org/ddsp">article/paper</ExternalLink> by project magenta has piqued my interest, and I have
                    since developed several prototype differentiable synthesizer networks that leverage those techniques. I&apos;m also very interested in
                    experimenting with transformers, which I think have good prospects to work well in the pipelines I&apos;ve been building.
                </p>
                <h3>Examples</h3>
                <p>so voice! is still very work in progress, so most of these have several problems</p>
                <ReactAudioPlayer src="/src/audio/so_voice/atma16000.mp3" autoPlay controls />
            </PageContainer>
        </>
    )
}
