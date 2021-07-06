import React from 'react'
import { PageContainer, PageHeading, Collage } from '../../Components'
import { ExternalLink } from '../../utilities'
import YouTube from 'react-youtube'
import block_diagram_inverted from '../../images/robojay/block_diagram_inverted.png'

export const RoboJay = (): JSX.Element => {
    const r = require.context('../../images/robojay/prior_work')
    const imageSrcs = r.keys().map((path: string) => r(path).default) as string[]

    return (
        <>
            <PageContainer>
                <PageHeading />
                <p>
                    RoboJay was a JHU Robotics Club project started in 2016 by the then club president. The goal was to build a robot which would give campus
                    tours to incoming students, and visitors. The project team poured a lot of time and effort into the project, but they all graduated before
                    the project could be completed. During my senior year, I ended up taking over as the new project lead.
                </p>
                <h3>Prior Work</h3>
                <p>
                    The main contribution of the previous team was the construction of RoboJay&apos;s body, including motors, drivers, and several sensors.
                    There had also been some initial work done on developing the user interface and virtual avatar performing the tour.
                </p>
                <Collage imageSrcs={imageSrcs} rowHeight="500px" rowSizes={[4]} />
                <p>
                    To give an idea of how RoboJay would move, the small scale{' '}
                    <ExternalLink href="https://www.ucsdrobotics.org/edumip">eduMIP robot</ExternalLink> is essentially a small scale version of RoboJay:
                </p>
                <YouTube videoId="PTUaDSryKVE" opts={{ width: '100%' }} />
                <br />
                <p>
                    The eduMIP balances on its two wheels and can easily drive around flat surfaces. RoboJay was intended to balance and navigate in the same
                    way, though it had training wheels affixed due to complications in tuning the dynamics, as well as safety concerns while untested.
                </p>
                <h3>Localization and Navigation</h3>
                <p>
                    For the short amount of time I worked on the project, I built a system for determining the robot&apos;s position on campus, and navigating
                    along a preplanned path. At a high level, the system performs sensor fusion between the wheel odometry and a GPS sensor to provide an
                    accurate estimate of RoboJay&apos;s position and orientation on the map. The existing RoboJay body included high accuracy rotary encoders
                    attached to each wheel, which made them ideal for tracking fine scale motion not easily detectable by a GPS. I hooked the rotary encoders up
                    to a new BeagleBone Blue microcontroller, which served as the main sensor and control interface for the robot. The BeagleBone communicates
                    with a laptop that consumes the sensor data, runs the sensor fusion algorithm, and generates high level commands for the robot to follow
                    based on its location (the GPS is hooked directly to the computer since it requires specific computer drivers to run).
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={block_diagram_inverted} style={{ width: '75%' }} />
                </div>
                <br />
                <p>
                    With this system, I was able to successfully demonstrate RoboJay localizing its position around campus, and commanding navigation towards
                    preplanned waypoint sequences. Unfortunately I too graduated before RoboJay could be completed, but the project was handed off to new
                    members in the JHU Robotics Club.
                </p>
            </PageContainer>
        </>
    )
}
