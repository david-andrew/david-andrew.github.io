import React from 'react'
import { PageContainer, PageHeading } from '../../Components'
import { ExternalLink, InternalLink, LogoIcon, AudioExamplePair } from '../../utilities'
import { List, Icon } from 'semantic-ui-react'
import architecture from '../../images/musical_dl/architecture.png'
import danny_boy_untuned from '../../audio/musical_dl/danny_boy_untuned.mp3'
import danny_boy_tuned from '../../audio/musical_dl/danny_boy_tuned.mp3'
import frere_jacques_tuned from '../../audio/musical_dl/frere_jacques_tuned.mp3'
import mary_had_a_little_lamb_untuned from '../../audio/musical_dl/mary_had_a_little_lamb_untuned.mp3'
import a_arpeggio_untuned from '../../audio/musical_dl/a_arpeggio_untuned.mp3'
import e_arpeggio_untuned from '../../audio/musical_dl/e_arpeggio_untuned.mp3'
import may_you_depart_untuned from '../../audio/musical_dl/may_you_depart_untuned.mp3'
import demons1 from '../../audio/musical_dl/demons1.mp3'
import demons2 from '../../audio/musical_dl/demons2.mp3'
import demons3 from '../../audio/musical_dl/demons3.mp3'
import JHUHubmark from '../../images/musical_dl/hubmark-full.png'

export const MusicalDL = (): JSX.Element => {
    const JHUHubmarkIcon = (): JSX.Element => LogoIcon(JHUHubmark, '35em')

    return (
        <>
            <PageContainer>
                <PageHeading />
                <p>
                    For the capstone project of Machine Learning: Deep Learning (EN.601.682), we were tasked to form teams and apply deep learning to a topic of
                    our choosing. My team of 3 attempted to create a deep learning based choral music synthesizer. Since singing voice synthesizers were (and
                    still are) a relatively unexplored area of machine learning, we each decided to apply separate ML architectures to our problem&mdash;I chose
                    to focus on the WaveNet architecture.
                </p>
                <h3>WaveNet</h3>
                <p>
                    At the time, the state of the art in pure speech synthesis was Google&apos;s WaveNet architecture, used extensively by their Google
                    Assistant. The{' '}
                    <ExternalLink href="https://deepmind.com/blog/article/wavenet-generative-model-raw-audio">DeepMind blog post about WaveNets</ExternalLink>{' '}
                    does a really great job illustrating how they work, but at a high level, WaveNets are a type of convolutional network which seeks to
                    directly model the distribution of real audio. WaveNets generates audio one sample at a time, and make use of a special type of so-called
                    dilated convolution which allows the architecture to simultaneously handle both small scale and large scale details present in audio data.
                </p>
                <p>
                    The specific implementation of WaveNet I used was the <ExternalLink href="https://github.com/NVIDIA/nv-wavenet">nv-wavenet</ExternalLink> by
                    Nvidia, which included several optimizations allowing for much faster audio synthesis. The final speech synthesis architecture looked very
                    similar to their <ExternalLink href="https://github.com/NVIDIA/tacotron2">Tacotron2</ExternalLink> architecture, consisting of a WaveNet
                    trained to generate audio from spectrograms, and a transformer trained to generate spectrograms given audio features&mdash;In their case the
                    transformer converts text to spectrograms, while mine converts from features like pitch, volume, vowel, singer, etc.
                </p>
                <p>
                    For the application of choir synthesis, we found the <ExternalLink href="https://zenodo.org/record/1193957">VocalSet dataset</ExternalLink>{' '}
                    which consists of 10 hours of monophonic singing by 20 singers. The data mostly consists of various scales and arpeggios sung on the vowels
                    &apos;a&apos;, &apos;e&apos;, &apos;i&apos;, &apos;o&apos;, and &apos;u&apos;, along with several other vocal techniques. To train the
                    WaveNet, I pulled out just the normal scales sung on each of the vowels, and had the WaveNet learn to reconstruct the raw audio given a
                    spectrogram. I then built a simple transformer network which would generate spectrograms for the WaveNet. The features used by the
                    transformer were either provided by the dataset itself (namely singer, and vowel), or were generated by analyzing the audio (pitch detection
                    for pitch, and mean absolute value for volume).
                </p>
                <p>
                    For the last piece of my solution, I pulled in the work I had done during a{' '}
                    <InternalLink to="/projects/ensemble_peabody">recent hackathon</InternalLink>, in which I had built a simple MusicXML parsing engine. With
                    the parsing engine, I could read simple sheet music, and generate the features that the neural network understood, allowing me to have the
                    network perform specific pieces.
                </p>
                <h3>Pipeline Diagram</h3>
                <img style={{ width: '100%' }} src={architecture} />
                <h3>Results</h3>
                <p>
                    For a first attempt, I think it worked surprisingly well&mdash;the audio definitely sounded like a choir of singers, just all of them were
                    tone deaf. As a last minute addition, I added an autotuner to correct the pitch deficiency, and actually got some surprisingly good results.
                </p>
                <AudioExamplePair
                    title="Danny Boy"
                    pairs={[{ audio1: { label: 'Original (untuned)', src: danny_boy_untuned }, audio2: { label: 'Autotuned version', src: danny_boy_tuned } }]}
                />
                <AudioExamplePair
                    title="More Examples"
                    pairs={[
                        {
                            audio1: { label: "'A' Arpeggio (untuned)", src: a_arpeggio_untuned },
                            audio2: { label: "'E' Arpeggio (untuned)", src: e_arpeggio_untuned },
                        },
                        {
                            audio1: { label: 'Mary Had a Little Lamb (untuned)', src: mary_had_a_little_lamb_untuned },
                            audio2: { label: 'Frère Jacques (autotuned)', src: frere_jacques_tuned },
                        },
                    ]}
                />
                <AudioExamplePair
                    title="The (Best) Worst Examples"
                    pairs={[
                        {
                            audio1: { label: '', src: demons2 },
                            audio2: { label: '', src: demons3 },
                        },
                        {
                            audio1: { label: '', src: may_you_depart_untuned },
                            audio2: { label: '', src: demons1 },
                        },
                    ]}
                />

                <h3>Lessons &amp; Future Work</h3>
                <p>
                    From working on this project, and analyzing the results, I&apos;ve learned two things: 1) audio is a very hard data domain to work with, 2)
                    pitch detection is not a solved problem. The first one I mostly expected, but the second really surprised me&mdash;pitch detection is still
                    an <ExternalLink href="https://ai.googleblog.com/2019/11/spice-self-supervised-pitch-estimation.html">active area of research</ExternalLink>
                    ! Ultimately, a mostly vanilla WaveNet isn&apos;t suited for singing voice synthesis due to several assumptions made about spoken voice,
                    namely that the dynamic range of pitches a spoken voice experiences is relatively small. The spectrograms used as feature input to the
                    WaveNet do not possess a suitable range of frequencies for singing applications, and increasing the range runs into issues of not enough
                    resolution, or too much memory used by the model.
                </p>
                <p>
                    Moving forward, I have continued to work on the problem of choral voice synthesis, and am starting to make good progress in my{' '}
                    <InternalLink to="/projects/so_voice">so voice!</InternalLink> project. The experience I gained from this attempt has been invaluable in
                    guiding my approach to building a more viable version.
                </p>
                <h3>Links</h3>
                <List>
                    <List.Item>
                        <span>
                            <Icon name="github" size="big" />
                            <ExternalLink href="https://github.com/david-andrew/MusicalDL">Github Repo</ExternalLink>
                        </span>
                    </List.Item>
                    <List.Item>
                        <span>
                            <Icon as={JHUHubmarkIcon} name="newspaper" size="big" />
                            <ExternalLink href="https://hub.jhu.edu/2019/06/11/ai-deep-learning/?fbclid=IwAR0YwrO_cX_AaLKPG7PzZkOdeKVsjJf0SXe3CFiOQNH5KjxjZeduwP0_3zY">
                                Johns Hopkins HUB Article
                            </ExternalLink>
                        </span>
                    </List.Item>
                </List>
            </PageContainer>
        </>
    )
}
