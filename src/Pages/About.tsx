import React from 'react'
import { PageContainer } from '../Components'
import { List, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import shield_logo from '../images/icons/university.shield.small.white.png'
import jhuapl_shield from '../images/icons/jhuapl_shield.png'
import idt_starburst from '../images/icons/idt_starburst.jpeg'
import hashtag from '../images/icons/hashtag.png'
import code from '../images/icons/code.png'
import blocks from '../images/icons/blocks.png'
import branch from '../images/icons/branch.png'
import circuit from '../images/icons/circuit.png'
import gears from '../images/icons/gears.png'

//Generate a react icon component for the given image
const LogoIcon = (src: string, width: string = '30em'): JSX.Element => {
    return <img style={{ float: 'left' }} className="icon" width={width} src={src} />
}

const BR = (): JSX.Element => (
    <>
        <br />
        <br />
    </>
)

export const About = (): JSX.Element => {
    const JHUShieldIcon = (): JSX.Element => LogoIcon(shield_logo)
    const APLShieldIcon = (): JSX.Element => LogoIcon(jhuapl_shield)
    const IDTStarburstIcon = (): JSX.Element => LogoIcon(idt_starburst)
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
                        <List.Description>Rust, Julia, C++, Java, Go, 6502 ASM, FORTRAN 77, Ti-BASIC</List.Description>
                    </List.Content>
                </List.Item>
                <List.Item>
                    <List.Icon as={BlocksIcon} verticalAlign="middle" />
                    <List.Content>
                        <List.Header>Frameworks</List.Header>
                        <List.Description>PyTorch, React, Robot Operating System, OpenCV</List.Description>
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
                        <List.Header>SPUR Intern</List.Header>
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
                        <List.Description>Oct. 2020 - Present</List.Description>
                    </List.Content>
                </List.Item>
            </List>
            <Divider />

            <h1>General</h1>
            <p>
                I have over 3 years of professional software engineering experience, as well as experience working with many state-of-the-art machine learning
                techniques. At IDT, I focused on both front end development, and machine learning. Of note, I designed a novel machine learning architecture for
                efficiently allocating compute resources to minimize the execution time of High Level Architecture (HLA) federated simulations. I also
                reimplemented a custom Python ensemble anomaly detection framework in Julia, as well as developed a custom React UI for visualizing the results.
                <BR />
                During my master&apos;s coursework I implemented a variety of ML algorithms from scratch, including MLP, SVM, Expectation Maximization, PCA,
                autoencoding, and autocorrelation/cross-correlation. Additionally, I&apos;ve worked with CNNs, VGG, ResNet, U-net, Viola Jones, and a variety of
                other architectures. For a <Link to="/projects/musical_dl">capstone project</Link> I developed a novel architecture that leveraged the WaveNet
                vocoder model paired with a custom convolutional transformer network to create a realistic choral voice synthesizer. Prior to that, at an
                internship with the Johns Hopkins Applied Physics Lab (JHUAPL), I worked on machine learning capabilities for controlling a robotic limb by
                analyzing electromyogram (EMG) signals in an individual&apos;s upper arm.
                <BR />
                For my undergraduate coursework, I mainly focused on mechanical design, and pure software development. Additionally, I participated in the JHU
                Robotics Club, where I worked on several interesting robotics projects, including a{' '}
                <Link to="/projects/drawbot">picture drawing robot arm</Link>, a <Link to="/projects/pongbot">defintely not beer pong robot</Link>, and a{' '}
                <Link to="/projects/robojay">Balancing tour guide robot</Link>. I also was a member of the JHU Rocketry Club, where I earned my level 1 High
                Power Rocketry certification, <Link to="/projects/rebel_scum">attempted unsuccessfully</Link> to earn my level 2 certification, and participated
                in the <Link to="/projects/spaceport_america_cup">2018 Spaceport America Cup</Link>. (TODO-&gt;hackathons)
                <BR />
                In my spare time, I&apos;ve worked on a number of interesting side projects, including a{' '}
                <Link to="/projects/dewy">custom programming language</Link>, a <Link to="/projects/ensemble">deep learning music synthesizer</Link>,{' '}
                <Link to="/projects/escort_mission">several</Link> <Link to="/projects/mehve">video</Link> <Link to="/projects/lords_of_sola">games</Link>, as
                well as a few other <Link to="/projects/blob_opera">odds</Link> and <Link to="/projects/composer">ends</Link>. Typically, I like to work on
                things that contain one or more elements of machine learning, music, or game development, but I also frequently find myself working on
                completely unrelated things, e.g. hydroponics, sewing, or celestial navigation.
                <BR />
            </p>
        </PageContainer>
    )
}
