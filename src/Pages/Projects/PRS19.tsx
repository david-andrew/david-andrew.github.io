import React from 'react'
import { PageContainer, PageHeading } from '../../Components'
import { useGithubTimestamp, InternalLink, ExternalLink } from '../../utilities'

export const PRS19 = (): JSX.Element => {
    const timestamp = useGithubTimestamp('PRS_robot')
    return (
        <>
            <PageContainer>
                <PageHeading title="PRS19: Fret Press Robot" subtitle={timestamp} />
                <p>
                    In the last semester of my Master&apos;s degree, I took part in the Mechanical Engineering Master&apos;s Design Project (EN.530.614).
                    Essentially <InternalLink to="/projects/wse18">Senior Design</InternalLink> with expanded scope and difficulty, the course is a year-long
                    design project where students design, fabricate, and test solutions for sponsor companies&apos; design problems. I joined the Paul Reed
                    Smith (PRS) team, and developed the entire software suite for running their automatic fret press robot.
                </p>
                <h3>Background</h3>
                <p>
                    <ExternalLink href="https://prsguitars.com/">Paul Reed Smith Guitars</ExternalLink> manufactures guitars largely by hand, making use of
                    automated techniques when it is possible to maintain quality. One particular process they were interested in automating was that of gluing
                    and pressing frets into the guitar neck&mdash;for each fret, a precise quantity of glue needs to be laid down in the fret slot, followed by
                    placing and then pressing a fret on top. The task itself is somewhat intricate, but also incredibly repetitive, leading to burnout among the
                    employees that perform the task.
                </p>
                <p>
                    In 2018, PRS sponsored a JHU Senior Design team to design and build a robot for automating the process. Ultimately the scope of the project
                    was too much to be completed in a single year, so PRS extended the project into 2019, and JHU Mechanical Engineering had a small team of
                    Master&apos;s students take over its completion. I joined the Master&apos;s team during the final semester of the project, and was tasked
                    with writing the entirety of the software needed to control and operate the robot.
                </p>
                <h3>Technical</h3>
                <p>
                    (robot driven by a single arduino mega)(hooked up to: 3 (how big?) stepper motors, several pneumatic actuators, many limit switches, a
                    weight sensor, laser fret detector, start buttons, )
                </p>
                <h3>Software</h3>
                <p>
                    (written entirely in C++)(controls all aspects of the robot: moving fret board along track, measuring alignment, actuating glue
                    motion/dispensing, press mechanism, snip mechanism, )
                </p>
                <h3>Laser Fret Detector</h3>
                <p>
                    In addition to software work, I also helped develop solutions for several mechanical and electrical issues facing the project. In
                    particular, I developed a novel laser based system for accurately measuring the precise location of each fret on the fret board. The robot
                    uses the fret locations to know where to lay the glue, as well as place and press the fret wire. The detector works by shining a laser
                    across the path of the fret board. As the board passes in front of the laser, it occludes the beam from the detector. When a slot passes in
                    front of the beam, some of the laser light is allowed through, which is picked up by a photodiode on the other side of the machine. The
                    peaks in brightness are then correlated with the step count from the stepper motor, to determine precisely where each fret is on the robot.
                </p>
            </PageContainer>
        </>
    )
}
