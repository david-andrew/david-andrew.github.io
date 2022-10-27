import React from 'react'
import { PageContainer } from '../Components'
import { List, Divider } from 'semantic-ui-react'
import { ExternalLink, InternalLink, LogoIcon } from '../utilities'
import shield_logo from '../images/icons/university.shield.small.white.png'
import jhuapl_shield from '../images/icons/jhuapl_shield.png'
import idt_starburst from '../images/icons/idt_starburst.png'
import jataware_logo from '../images/icons/jataware_logo.png'
import hashtag from '../images/icons/hashtag.png'
import code from '../images/icons/code.png'
import blocks from '../images/icons/blocks.png'
import branch from '../images/icons/branch.png'
import circuit from '../images/icons/circuit.png'
import gears from '../images/icons/gears.png'

export const About = (): JSX.Element => {
    const JHUShieldIcon = (): JSX.Element => LogoIcon(shield_logo)
    const APLShieldIcon = (): JSX.Element => LogoIcon(jhuapl_shield)
    const IDTStarburstIcon = (): JSX.Element => LogoIcon(idt_starburst)
    const JatawareIcon = (): JSX.Element => LogoIcon(jataware_logo)
    const HashtagIcon = (): JSX.Element => LogoIcon(hashtag)
    const CodeIcon = (): JSX.Element => LogoIcon(code)
    const BlocksIcon = (): JSX.Element => LogoIcon(blocks)
    const BranchIcon = (): JSX.Element => LogoIcon(branch)
    const CircuitIcon = (): JSX.Element => LogoIcon(circuit)
    const GearsIcon = (): JSX.Element => LogoIcon(gears)

    return (
        <PageContainer>
            <h1>Skills</h1>
            <List inverted relaxed>
                <List.Item>
                    <List.Icon as={HashtagIcon} verticalAlign="middle" />
                    <List.Content>
                        <List.Header>Programming (Advanced)</List.Header>
                        <List.Description>Python, C, Typescript, MATLAB</List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon as={CodeIcon} verticalAlign="middle" />
                    <List.Content>
                        <List.Header>Programming (Moderate)</List.Header>
                        <List.Description>Rust, Julia, CUDA C, C++, Java, Go, 6502 ASM, FORTRAN 77, Ti-BASIC</List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon as={BlocksIcon} verticalAlign="middle" />
                    <List.Content>
                        <List.Header>Frameworks</List.Header>
                        <List.Description>PyTorch (with GPU), React, WebAssembly, Robot Operating System, OpenCV, Qt</List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon as={BranchIcon} verticalAlign="middle" />
                    <List.Content>
                        <List.Header>Misc. Software</List.Header>
                        <List.Description>Unix, Git, Godot, Unity3D, SolidWorks, PTC-Creo, Inkscape, Microsoft Office</List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon as={CircuitIcon} verticalAlign="middle" />
                    <List.Content>
                        <List.Header>Electronics</List.Header>
                        <List.Description>
                            Raspberry Pi, Arduino, radio control, basic digital electronics (servos, logic gates, op-amps, etc.)
                        </List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon as={GearsIcon} verticalAlign="middle" />
                    <List.Content>
                        <List.Header>Manufacturing</List.Header>
                        <List.Description>laser cutter, mill, lathe, MIG welding, drill press, band saw, chop saw</List.Description>
                    </List.Content>
                </List.Item>
            </List>
            <Divider />
            <h1>Education</h1>
            <h3 style={{ marginTop: 0 }}>Johns Hopkins University</h3>
            <List inverted relaxed>
                <List.Item>
                    <List.Icon as={JHUShieldIcon} verticalAlign="middle" size="large" />
                    <List.Content>
                        <List.Header>Bachelor of Science in Mechanical Engineering</List.Header>
                        <List.Description>Sept. 2014 - May 2018</List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon as={JHUShieldIcon}></List.Icon>
                    <List.Content>
                        <List.Header>Master of Science in Engineering in Robotics (Machine Learning concentration)</List.Header>
                        <List.Description>Sept. 2018 - May 2019</List.Description>
                    </List.Content>
                </List.Item>
            </List>
            <Divider />
            <h1>Work History</h1>
            <h3 style={{ marginTop: 0 }}>Johns Hopkins Applied Physics Lab</h3>
            <List inverted relaxed>
                <List.Item>
                    <List.Icon as={APLShieldIcon} verticalAlign="middle" size="large" />
                    <List.Content>
                        <List.Header>Intern</List.Header>
                        <List.Description>June 2016 - Aug. 2016</List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon as={APLShieldIcon} verticalAlign="middle" size="large" />
                    <List.Content>
                        <List.Header>Temp-on-Call Staff</List.Header>
                        <List.Description>Sept. 2016 - July 2017</List.Description>
                    </List.Content>
                </List.Item>
            </List>

            <h3>Innovative Defense Technologies</h3>
            <List inverted relaxed>
                <List.Item>
                    <List.Icon as={IDTStarburstIcon} verticalAlign="middle" size="large" />
                    <List.Content>
                        <List.Header>Associate Systems Engineer</List.Header>
                        <List.Description>June 2019 - Oct. 2020</List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon as={IDTStarburstIcon} verticalAlign="middle" size="large" />
                    <List.Content>
                        <List.Header>Systems Engineer II (Data Science)</List.Header>
                        <List.Description>Oct. 2020 - Feb. 2022</List.Description>
                    </List.Content>
                </List.Item>
            </List>
            <h3>Jataware</h3>
            <List inverted relaxed>
                <List.Item>
                    <List.Icon as={JatawareIcon} verticalAlign="middle" size="large" />
                    <List.Content>
                        <List.Header>Data Scientist</List.Header>
                        <List.Description>Feb. 2022 - Present</List.Description>
                    </List.Content>
                </List.Item>
            </List>
            <Divider />

            <h1>General</h1>
            <p>
                I have over 4 years of professional software engineering experience, as well as experience working with many state-of-the-art machine learning
                techniques. At Jataware, I worked on a variety of research and technical projects, with focuses on machine learning and data science applications. 
                I researched approaches to extend existing SOTA diplomacy AI models to leverage communication during gameplay for collaboration and betrayal.
                I also researched and implemented approaches to <ExternalLink href="https://arxiv.org/abs/1703.05082">Selective Harvesting</ExternalLink>{' '}
                i.e. efficient search + filtering over enormous graph networks. Additionally, I implemented a highly optimized graph-neural-network convolution 
                algorithm in CUDA, and also developed several computer vision approaches to identify and locate sections on a map image for the USGS georeference 
                challenge.                
            </p>
            <p>
                At IDT, I focused on both machine learning, and front end development. Of note, I designed a novel machine learning architecture for
                efficiently allocating compute resources to minimize the execution time of High Level Architecture (HLA) federated simulations. I also
                implemented a custom time series anomaly detection ensemble model in Julia, and developed the React UI for visualizing the results.
            </p>
            <p>
                During my master&apos;s coursework I implemented a variety of ML algorithms from scratch, including MLP, SVM, Expectation Maximization, PCA,
                autoencoding, and autocorrelation/cross-correlation. Additionally, I&apos;ve worked with CNNs, VGG, ResNet, U-net, Viola Jones, and a variety of
                other architectures. For a <InternalLink to="/projects/musical_dl">capstone project</InternalLink> I developed a novel architecture that
                leveraged the WaveNet vocoder model paired with a custom convolutional transformer network to create a realistic choral voice synthesizer. Prior
                to that, at an internship with the Johns Hopkins Applied Physics Lab (JHUAPL), I worked on machine learning capabilities for controlling a
                robotic limb by analyzing electromyogram (EMG) signals in an individual&apos;s upper arm.
            </p>
            <p>
                For my undergraduate coursework, I mainly focused on mechanical design, and pure software development. Additionally, I participated in the JHU
                Robotics Club, where I worked on several interesting robotics projects, including a{' '}
                <InternalLink to="/projects/drawbot">picture drawing robot arm</InternalLink>, a{' '}
                <InternalLink to="/projects/pongbot">defintely not beer pong robot</InternalLink>, and a{' '}
                <InternalLink to="/projects/robojay">Balancing tour guide robot</InternalLink>. I also was a member of the JHU Rocketry Club, where I earned my
                level 1 High Power Rocketry certification, <InternalLink to="/projects/rebel_scum">attempted unsuccessfully</InternalLink> to earn my level 2
                certification, and participated in the <InternalLink to="/projects/spaceport_america_cup">2018 Spaceport America Cup</InternalLink>. And also,
                whenever I had the opportunity, I enjoyed participating in the JHU hackathons held twice a year, leading to projects like{' '}
                <InternalLink to="/projects/ensemble_peabody">Ensemble (Hacking Harmony)</InternalLink>,{' '}
                <InternalLink to="/projects/boat_simulator">Boat Simulator</InternalLink>, and{' '}
                <InternalLink to="/projects/bueller_board">Bueller Board</InternalLink>.
            </p>
            <p>
                In my spare time, I&apos;ve worked on a number of interesting side projects, including a{' '}
                <InternalLink to="/projects/dewy">custom programming language</InternalLink>, a{' '}
                <InternalLink to="/projects/so_voice">deep learning music synthesizer</InternalLink>,{' '}
                <InternalLink to="/projects/escort_mission">several</InternalLink> <InternalLink to="/projects/mehve">video</InternalLink>{' '}
                <InternalLink to="/projects/lords_of_sola">games</InternalLink>, as well as a few other{' '}
                <InternalLink to="/projects/blob_opera">odds</InternalLink> and <InternalLink to="/projects/composer">ends</InternalLink>. Typically, I like to
                work on things that contain one or more elements of machine learning, music, or game development, but I also frequently find myself working on
                completely unrelated things, e.g. hydroponics, sewing, or celestial navigation.
            </p>
        </PageContainer>
    )
}
