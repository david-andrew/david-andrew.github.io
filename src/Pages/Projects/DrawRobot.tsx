import React from 'react'
import { PageContainer, PageHeading, Collage } from '../../Components'
import { ExternalLink } from '../../utilities'
import YouTube from 'react-youtube'
import { Icon, List } from 'semantic-ui-react'

export const DrawRobot = (): JSX.Element => {
    const r = require.context('../../images/drawbot')
    const imageSrcs = r.keys().map((path: string) => r(path).default) as string[]

    return (
        <>
            <PageContainer>
                <PageHeading title="UR5 Draw Robot" subtitle="December 2017" />
                <p>
                    As a part of the Robotics Master&apos;s degree, students are required to take Robot Kinematics, Dynamics, and Control (EN.530.646), a
                    rigorous overview of the math used in robotics. Honestly, I would describe it as the hardest math course I ever took, but by the end, we had
                    the opportunity to program the <ExternalLink href="https://www.universal-robots.com/products/ur5-robot/">UR5 Robot Arm</ExternalLink> using
                    our hard earned knowledge.
                </p>
                <p>
                    For the final project, there were two components:
                    <ol>
                        <li>Pick up a block on a table and move it to a target</li>
                        <li>Any application of your choosing&mdash;my group decided to make a drawing robot</li>
                    </ol>
                    For the first task, you had to implement two different control schemes for moving the robot arm in 3D space. Along with a third provided
                    control scheme, the task was to then use all three controllers to run a sequence of moving the arm to the start location above a block,
                    closing the gripper on the block, and then moving the block to a target location and releasing it. For this part of the project, my
                    teammates programmed the low-level control algorithms while I handled the high-level sequencing for performing the task.
                </p>
                <p>
                    For the second part, we decided to fix a tool to the robot holding a marker, and have it draw pictures on a whiteboard. I handled the bulk
                    of the work for this part, including fabricating a tool to hold the marker, and writing all the code for robot calibration and converting
                    images into robot trajectories. To keep the code simple, images are converted directly to a contour plot based on the brightness of pixels.
                    The level set contours are then converted from 2D into world space for the robot to draw. Once the robot position is calibrated, the robot
                    then performs the task of tracing along each of the contours from the image.
                </p>
                <h3>Custom Marker End Effector</h3>
                <Collage imageSrcs={imageSrcs} />
                <h3>Video Demo</h3>
                <YouTube videoId="FeDsPanEYDo" opts={{ width: '100%' }} />
                <h3>Links</h3>
                <List>
                    <List.Item>
                        <span>
                            <Icon name="file alternate" size="big" />
                            <ExternalLink href="/docs/drawbot/final_report.pdf" download>
                                Final Report
                            </ExternalLink>
                        </span>
                    </List.Item>
                    {/* <List.Item>
                        <span>
                            <Icon name="table" size="big" />
                            <ExternalLink href="/docs/wse18/poster.pdf" download>
                                Design Day Poster
                            </ExternalLink>
                        </span>
                    </List.Item>
                    <List.Item>
                        <span>
                            <Icon name="object group" size="big" />
                            <ExternalLink href="/docs/wse18/final_presentation.pdf">Design Day Presentation</ExternalLink>
                        </span>
                    </List.Item> */}
                </List>
            </PageContainer>
        </>
    )
}
