import React from 'react'
import { PageContainer, PageHeading } from '../../Components'
import { ExternalLink, InternalLink, AudioExamplePair } from '../../utilities'
import atma16000 from '../../audio/so_voice/atma16000.wav'
import atma16000resynth from '../../audio/so_voice/atma16000resynth.wav'
import david1 from '../../audio/so_voice/david1.wav'
import david1_hat from '../../audio/so_voice/david1_hat.wav'
import david2 from '../../audio/so_voice/david2.wav'
import david2_hat from '../../audio/so_voice/david2_hat.wav'
import nox from '../../audio/so_voice/nox.wav'
import nox_hat from '../../audio/so_voice/nox_hat.wav'
import pando_260800_4_y from '../../audio/so_voice/pando_260800_4_y.wav'
import pando_260800_4_y_hat from '../../audio/so_voice/pando_260800_4_y_hat.wav'
import when_david_heard_lpc from '../../audio/so_voice/when_david_heard_lpc.mp3'
import when_david_heard_lpc_aaa from '../../audio/so_voice/when_david_heard_lpc_aaa.mp3'

export const SoVoice = (): JSX.Element => {
    return (
        <>
            <PageContainer>
                <PageHeading />
                <p>
                    so voice! is the spiritual successor to my <InternalLink to="/projects/musical_dl">Deep Learning Capstone Project</InternalLink>. The goal
                    is to develop a choir synthesizer that leverages deep learning to produce audio indistinguishable from real recordings.
                </p>
                <h3>Method</h3>
                <p>
                    Since I intend to commercialize so voice! in the near future, I won&apos;t go into too much detail about the inner workings on here. But at
                    a high level, so voice! consists of two main parts: the parsing engine, and the synthesizer. The parsing engine reads in sheet music,
                    currently from well formed (read curated) MusicXML files, and converts them to a serial representation that can be fed into a machine
                    learning pipeline. The synthesizer then pipes that representation through a series of deep learning models which ultimately output an audio
                    file that is the synthesized performance of the input. Eventually I&apos;d also like to add in a machine learning pipeline for reading sheet
                    music from images (e.g. PDFs).
                </p>
                <p>
                    In terms of the actual machine learning pipeline, I have been developing custom architectures ever since I started working on the project in
                    early 2019. Initially I centered my design around the WaveNet, which Google uses to great effect for their Text-to-Speech service, however
                    several compounding factors cause WaveNets to be unsuitable for choral voice synthesis, e.g. difficulty parallelizing, low output sample
                    rates, small pitch range, etc. More recently a <ExternalLink href="https://magenta.tensorflow.org/ddsp">article/paper</ExternalLink> by
                    project magenta has piqued my interest, and I have since developed several prototype differentiable synthesizer networks that leverage those
                    techniques. I&apos;m also very interested in experimenting with transformers, which I think have good prospects to work well in the
                    pipelines I&apos;ve been building.
                </p>
                <h3>Current Example</h3>
                <p>
                    This demonstrates the final step in the pipeline which generates audio given output from all the previous steps. To test it in isolation, I
                    have it attempt to recreate real audio clips, which gives an idea of how well it will perform in the full pipeline.
                </p>
                <AudioExamplePair
                    title="Audio Resynthesis (16000 Hz)"
                    pairs={[
                        {
                            audio1: { label: 'Mother and Child (Real)', src: atma16000 },
                            audio2: { label: 'Mother and Child (Resynthesis)', src: atma16000resynth },
                        },
                        {
                            audio1: { label: 'When David Heard (1) (Real)', src: david1},
                            audio2: { label: 'When David Heard (1) (Resynthesis)', src: david1_hat}
                        },
                        {
                            audio1: { label: 'When David Heard (2) (Real)', src: david2},
                            audio2: { label: 'When David Heard (2) (Resynthesis)', src: david2_hat}
                        },
                        {
                            audio1: { label: 'Nox Aurumque (Real)', src: nox},
                            audio2: { label: 'Nox Aurumque (Resynthesis)', src: nox_hat}
                        }
                    ]}
                />
                <p>
                    Additionally, using the music parsing engine, I put together a <InternalLink to="/projects/blob_opera">silly spinoff project</InternalLink>{' '}
                    leveraging Google Arts &amp; Culture&apos;s{' '}
                    <ExternalLink href="https://artsandculture.google.com/experiment/blob-opera/AAHWrq360NcGbw">Blob Opera</ExternalLink> as a stand in for
                    choir synthesis.
                </p>
                <h3>Previous Experiments</h3>
                <p>
                    These demonstrate a few previous approaches I tried for audio generation. For the Auto-Encoder GAN experiment, I attempted to build a mostly
                    vanilla{' '}
                    <ExternalLink href="https://towardsdatascience.com/auto-encoder-what-is-it-and-what-is-it-used-for-part-1-3e5c6f017726">
                        autoencoder
                    </ExternalLink>{' '}
                    and train with adversarial loss, commonly used in{' '}
                    <ExternalLink href="https://machinelearningmastery.com/what-are-generative-adversarial-networks-gans/">
                        Generative Adversarial Networks
                    </ExternalLink>
                    .
                </p>
                <AudioExamplePair
                    title="Autoencoder GAN Experiment"
                    pairs={[
                        {
                            audio1: { label: 'Real audio (16000 Hz)', src: pando_260800_4_y },
                            audio2: { label: 'Auto-encoded version', src: pando_260800_4_y_hat },
                        },
                    ]}
                />
                <p>
                    For the LPC synthesis experiment, I recorded samples of each commonly sung phoneme by a professional singer, and then used the{' '}
                    <ExternalLink href="https://ccrma.stanford.edu/~hskim08/lpc/">Linear Predictive Coding</ExternalLink> technique to splice them together at
                    the correct pitches, generating a whole song. I had a lot of trouble generating noise-based phonemes (e.g. &apos;s&apos;, &apos;f&apos;,
                    &apos;t&apos;, &apos;ch&apos;, etc.) which is the popping and clicking sounds in the full lyrics example. The second example locks the
                    phoneme to &apos;a&apos; for the whole song, to give an example without the clicks and pops.
                </p>
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
                definitely gained a lot of new machine learning experience since I last worked on it, so I&apos;m excited to take a fresh look&mdash;with any
                luck, I&apos;ll have many new and better examples to add to this page!
            </PageContainer>
        </>
    )
}
