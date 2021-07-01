import React from 'react'
import { PageContainer, PageHeading, Collage } from '../../Components'
import { Grid } from 'semantic-ui-react'
import YouTube from 'react-youtube'

export const PongBot = (): JSX.Element => {
    const gimbal_r = require.context('../../images/pongbot/gimbal')
    const gimbal_imageSrcs = gimbal_r.keys().map((path: string) => gimbal_r(path).default) as string[]

    const cv_r = require.context('../../images/pongbot/cv_data')
    const cv_imageSrcs = cv_r.keys().map((path: string) => cv_r(path).default) as string[]

    return (
        <>
            <PageContainer>
                <PageHeading />
                <p>
                    pOngBot started as a JHU Robotics Club project to build a robot that could autonomously play beer pong. Prior to my taking over of the
                    project, the two previous teams that worked on it had made several small prototype components, but not much in the way of large scale
                    progress. I took over the project in Fall 2018 when they graduated.
                </p>
                <p>
                    For the most part, I built out each component of pOngBot by myself, as interest in (and time for) the project from club members seemed to be
                    waning. Conceptually, pOngBot needs the following systems to operate: vision, a ball shooter, and an AI or decision making logic.
                </p>
                <h3>Vision</h3>
                <p>
                    The vision requirements for pOngBot are pretty straightforward&mdash;it just needs to be able to determine where cups are in 3D space so
                    that it knows where to aim. Additionally, it would be useful to know where ping pong balls are, for a number of reasons, namely being able
                    to determine when it is pOngBot&apos;s turn, and also as a tool for reinforcement learning.
                </p>
                <p>
                    For an initial stab at localizing cup positions, I developed a system that leveraged the Viola-Jones algorithm, commonly used for face
                    detection in photos/videos. My system was instead trained on many pictures of cups, and trained to place a bounding box around the opening
                    section.
                </p>
                <Collage imageSrcs={cv_imageSrcs} rowSizes={[2, 2]} />
                <p>
                    The top two images show examples of data collected for the CV system, and the bottom two shows real time examples of the Viola-Jones
                    algorithm operating. Notice that the Viola-Jones output captures all of the cups, but also is filled with many false positives. The original
                    paper for face detection with Viola-Jones used about 100 times more data than I did for this particular iteration.
                </p>
                <p>
                    From this point, the next steps in the vision system would be to implement 3D localization. At the moment, the algorithm simply marks where
                    in the image a cup is identified, but those 2D image space coordinates need to be converted to 3D world space. This could potentially be
                    solved with a single camera, by measuring the size of each cup opening (since they are the same size, differences in apparent size could be
                    mapped to a z-coordinate), or potentially by using a stereo vision system with at least 2 cameras.
                </p>
                <h3>Shooter</h3>
                <p>
                    When I was president of the robotics club, the Robotics department at JHU donated to us a large amount of unused equipment&mdash;perfect for
                    pOngBot was a gimbaling frame controlled by 2 stepper motors. Building off of the gimbal, I added a mount for a tube, which could be used to
                    shoot ping pong balls with air. I also bought a commercial speaker stand, and fabricated a mount to attach the gimbal to the stand. For a
                    simple demo of the aiming mechanism, I temporarily fastened on the electronics for running the steppers, and hooked up an arduino to control
                    the system.
                </p>
                <Collage imageSrcs={gimbal_imageSrcs} />
                <p>
                    To shoot the ping pong balls, the plan was to use some sort of air pump with ducting up to the tube attached to the gimbal. Then ping pong
                    balls could be shot simply by introducing them into the air stream. The particular air pump still needs to be worked out. I tried the
                    smallest electric leaf blower I could find, but that ended up being way too powerful, so I&apos;m on the lookout for something even smaller.
                </p>
                <Grid columns={2}>
                    <Grid.Column>
                        <Grid.Row>
                            <YouTube videoId="7YbrslKFqns" opts={{ width: '100%' }} />
                        </Grid.Row>
                    </Grid.Column>
                    <Grid.Column>
                        <Grid.Row>
                            <YouTube videoId="8hBZnOJ7Mzs" opts={{ width: '100%' }} />
                        </Grid.Row>
                    </Grid.Column>
                </Grid>
                <h3>AI</h3>
                <p>
                    The AI system for pOngBot is intended to drive all high level actions the robot takes, such as taking a shot, waiting for the player to take
                    a turn, etc. The system will take in information from the various sensors, and command the robot to take actions that are most likely to
                    cause it to win the game. Work on the AI system will be started after a working prototype of the robot is ready. Initially the AI system
                    will probably be a simple state based controller, but eventually, I plan to implement a form of reinforcement learning to train the robot to
                    play as optimally as possible.
                </p>
                <h3>Future Work</h3>
                <p>
                    When I graduated, the club decided to donate pOngBot to me, mainly so it wouldn&apos;t sit around wasting limited club storage space. Since
                    leaving, I&apos;ve done a small amount of work on it, but currently it&apos;s on pause until I gain access to a better workspace. When I do
                    pick it up again, future steps will include:
                    <ol>
                        <li>Completing the shooting mechanism</li>
                        <li>Cleaning up the routing and attachment of electrical components</li>
                        <li>Expanding the vision system to use stereo vision to compute 3D coordinates of cups</li>
                        <li>Implementing an AI system for controlling robot actions</li>
                    </ol>
                </p>
            </PageContainer>
        </>
    )
}
