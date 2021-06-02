import React from 'react'
import { PageContainer, PageHeading } from '../../Components'
import { ExternalLink, InternalLink } from '../../utilities'
import { Table } from 'semantic-ui-react'
import ReactAudioPlayer from 'react-audio-player'
import atma16000 from '../../audio/so_voice/atma16000.wav'
import atma16000resynth from '../../audio/so_voice/atma16000resynth.wav'
import pando_260800_4_y from '../../audio/so_voice/pando_260800_4_y.wav'
import pando_260800_4_y_hat from '../../audio/so_voice/pando_260800_4_y_hat.wav'
import when_david_heard_lpc from '../../audio/so_voice/when_david_heard_lpc.mp3'
import when_david_heard_lpc_aaa from '../../audio/so_voice/when_david_heard_lpc_aaa.mp3'

interface AudioCell {
    label: string
    src: string
}
interface AudioPair {
    audio1: AudioCell
    audio2: AudioCell
}

//TODO->make this take in a list of pairs
const AudioExamplePair = ({ title, pairs }: { title: string; pairs: AudioPair[] }): JSX.Element => {
    return (
        <Table inverted>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>
                        <h3>{title}</h3>
                    </Table.HeaderCell>
                    <Table.HeaderCell />
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {pairs.map(({ audio1, audio2 }: AudioPair) => (
                    <Table.Row key={`${audio1.label}${audio1.src}${audio2.label}${audio2.src}`}>
                        <Table.Cell>
                            <h4>{audio1.label}</h4>
                            <ReactAudioPlayer src={audio1.src} style={{ width: '100%' }} controls />
                        </Table.Cell>
                        <Table.Cell>
                            <h4>{audio2.label}</h4>
                            <ReactAudioPlayer src={audio2.src} style={{ width: '100%' }} controls />
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    )
}

export const SoVoice = (): JSX.Element => {
    return (
        <>
            <PageContainer>
                <PageHeading title="so voice!" subtitle="January 2021" />
                <p>
                    so voice! is the spiritual successor to my <InternalLink to="/projects/musical_dl">Deep Learning Capstone Project</InternalLink>. The goal
                    is to develop a choir synthesizer that leverages deep learning to produce audio indistinguishable from real recordings.
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
                    early 2019. Initially I centered my design around the WaveNet, which Google uses to great effect for their Text-to-Speech service, however
                    several compounding factors cause WaveNets to be unsuitable for choral voice synthesis, e.g. difficulty parallelizing, low output sample
                    rates, small pitch range, etc. More recently a <ExternalLink href="https://magenta.tensorflow.org/ddsp">article/paper</ExternalLink> by
                    project magenta has piqued my interest, and I have since developed several prototype differentiable synthesizer networks that leverage those
                    techniques. I&apos;m also very interested in experimenting with transformers, which I think have good prospects to work well in the
                    pipelines I&apos;ve been building.
                </p>
                <h3>Current Examples</h3>
                <AudioExamplePair
                    title="Audio Resynthesis"
                    pairs={[
                        {
                            audio1: { label: 'Real audio (16000 Hz)', src: atma16000 },
                            audio2: { label: 'Resynthesized version', src: atma16000resynth },
                        },
                    ]}
                />
                <AudioExamplePair
                    title="Auto-Encoder GAN Experiment"
                    pairs={[
                        {
                            audio1: { label: 'Real audio (16000 Hz)', src: pando_260800_4_y },
                            audio2: { label: 'Auto-encoded version', src: pando_260800_4_y_hat },
                        },
                    ]}
                />
                <AudioExamplePair
                    title="LPC Synthesis Experiment"
                    pairs={[
                        {
                            audio1: { label: 'When David Heard - Full lyrics', src: when_david_heard_lpc },
                            audio2: { label: "When David Heard - No lyrics (Aaah's)", src: when_david_heard_lpc_aaa },
                        },
                    ]}
                />
                <h3>Future</h3>
                so voice! is the next project on in my queue to focus on, so I&apos;m hoping to get some good progress in over the coming year. I&apos;ve
                definitely gained a lot of new machine learning experience since I last worked on it, so I&apos;m excited to take a fresh look and hopefully
                make some good progress. With any luck, I&apos;ll have many more better examples to add to this page!
            </PageContainer>
        </>
    )
}
