'use client'
import { AudioGrid } from '@/app/(components)/audio'
import { H3, P, Link } from '@/app/(components)/ui'
import atma16000 from '@/(audio)/so_voice/atma16000.wav'
import atma16000resynth from '@/(audio)/so_voice/atma16000resynth.wav'
import david1 from '@/(audio)/so_voice/david1.wav'
import david1_hat from '@/(audio)/so_voice/david1_hat.wav'
import david2 from '@/(audio)/so_voice/david2.wav'
import david2_hat from '@/(audio)/so_voice/david2_hat.wav'
import nox from '@/(audio)/so_voice/nox.wav'
import nox_hat from '@/(audio)/so_voice/nox_hat.wav'
import pando_260800_4_y from '@/(audio)/so_voice/pando_260800_4_y.wav'
import pando_260800_4_y_hat from '@/(audio)/so_voice/pando_260800_4_y_hat.wav'
import when_david_heard_lpc from '@/(audio)/so_voice/when_david_heard_lpc.mp3'
import when_david_heard_lpc_aaa from '@/(audio)/so_voice/when_david_heard_lpc_aaa.mp3'

const Page = (): JSX.Element => {
    return (
        <>
            <P>
                so voice! is the spiritual successor to my{' '}
                <Link href="/projects/musical_dl">Deep Learning Capstone Project</Link>. The goal is to develop a choir
                synthesizer that leverages deep learning to produce audio indistinguishable from real recordings.
            </P>
            <H3>Method</H3>
            <P>
                At a high level, so voice! consists of two main parts: the parsing engine, and the synthesizer. The
                parsing engine reads in sheet music, currently from well formed (read curated) MusicXML files, and
                converts them to a serial representation that can be fed into a machine learning pipeline. The
                synthesizer then pipes that representation through a series of deep learning models which ultimately
                output an audio file that is the synthesized performance of the input. Eventually I&apos;d also like to
                add in a machine learning pipeline for reading sheet music from images (e.g. PDFs).
            </P>
            <P>
                In terms of the actual machine learning pipeline, I have been developing custom architectures ever since
                I started working on the project in early 2019. Initially I centered my design around the WaveNet, which
                Google uses to great effect for their Text-to-Speech service, however several compounding factors cause
                WaveNets to be unsuitable for choral voice synthesis, e.g. difficulty parallelizing, low output sample
                rates, small pitch range, etc. More recently a{' '}
                <Link href="https://magenta.tensorflow.org/ddsp">article/paper</Link> by project magenta has piqued my
                interest, and I have since developed several prototype differentiable synthesizer networks that leverage
                those techniques. I&apos;m also very interested in experimenting with transformers, which I think have
                good prospects to work well in the pipelines I&apos;ve been building.
            </P>
            <H3>Current Example</H3>
            <P>
                This demonstrates the final step in the pipeline which generates audio given output from all the
                previous steps. To test it in isolation, I have it attempt to recreate real audio clips, which gives an
                idea of how well it will perform in the full pipeline.
            </P>
            <AudioGrid
                title="Audio Resynthesis (16000 Hz)"
                clips={[
                    { label: 'Mother and Child (Real)', src: atma16000 },
                    { label: 'Mother and Child (Resynthesized)', src: atma16000resynth },

                    { label: 'When David Heard (1) (Real)', src: david1 },
                    { label: 'When David Heard (1) (Resynthesized)', src: david1_hat },

                    { label: 'When David Heard (2) (Real)', src: david2 },
                    { label: 'When David Heard (2) (Resynthesized)', src: david2_hat },

                    { label: 'Nox Arumque (Real)', src: nox },
                    { label: 'Nox Arumque (Resynthesized)', src: nox_hat },
                ]}
            />
            <P>
                Additionally, using the music parsing engine, I put together a{' '}
                <Link href="/projects/blob_opera">silly spinoff project</Link> leveraging Google Arts &amp;
                Culture&apos;s{' '}
                <Link href="https://artsandculture.google.com/experiment/blob-opera/AAHWrq360NcGbw">Blob Opera</Link> as
                a stand in for choir synthesis.
            </P>
            <H3>Previous Experiments</H3>
            <P>
                These demonstrate a few previous approaches I tried for audio generation. For the Auto-Encoder GAN
                experiment, I attempted to build a mostly vanilla{' '}
                <Link href="https://towardsdatascience.com/auto-encoder-what-is-it-and-what-is-it-used-for-part-1-3e5c6f017726">
                    autoencoder
                </Link>{' '}
                and train with adversarial loss, commonly used in{' '}
                <Link href="https://machinelearningmastery.com/what-are-generative-adversarial-networks-gans/">
                    Generative Adversarial Networks
                </Link>
                .
            </P>
            <AudioGrid
                title="Autoencoder GAN Experiment"
                clips={[
                    { label: 'Real audio (16000 Hz)', src: pando_260800_4_y },
                    { label: 'Auto-encoded version', src: pando_260800_4_y_hat },
                ]}
            />
            <P>
                For the LPC synthesis experiment, I recorded samples of each commonly sung phoneme by a professional
                singer, and then used the{' '}
                <Link href="https://ccrma.stanford.edu/~hskim08/lpc/">Linear Predictive Coding</Link> technique to
                splice them together at the correct pitches, generating a whole song. I had a lot of trouble generating
                noise-based phonemes (e.g. &apos;s&apos;, &apos;f&apos;, &apos;t&apos;, &apos;ch&apos;, etc.) which is
                the popping and clicking sounds in the full lyrics example. The second example locks the phoneme to
                &apos;a&apos; for the whole song, to give an example without the clicks and pops.
            </P>
            <AudioGrid
                title="LPC Synthesis Experiment"
                clips={[
                    { label: 'When David Heard - Full lyrics', src: when_david_heard_lpc },
                    { label: "When David Heard - No lyrics (Aaah's)", src: when_david_heard_lpc_aaa },
                ]}
            />
            <H3>Future</H3>
            <P>
                so voice! is the next project on in my queue to focus on, so I&apos;m hoping to get some good progress
                in over the coming year. I&apos;ve definitely gained a lot of new machine learning experience since I
                last worked on it, so I&apos;m excited to take a fresh look&mdash;with any luck, I&apos;ll have many new
                and better examples to add to this page!
            </P>
        </>
    )
}

export default Page
