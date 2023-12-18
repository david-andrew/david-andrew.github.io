import { P, H3, Link } from '@/app/(components)/ui'
import { YouTube } from '@/app/(components)/youtube'
import { Collage, SingleImageCollage } from '@/app/(components)/collage'
import { getImages } from '@/app/projects/fetch'
import block_diagram_inverted from '@/app/(images)/robojay/block_diagram_inverted.png'

const Page = async (): Promise<JSX.Element> => {
    const images = await getImages('robojay/prior_work')
    return (
        <>
            <P>
                RoboJay was a JHU Robotics Club project started in 2016 by the then club president. The goal was to
                build a robot which would give campus tours to incoming students, and visitors. The project team poured
                a lot of time and effort into the project, but they all graduated before the project could be completed.
                During my senior year, I ended up taking over as the new project lead.
            </P>
            <H3>Prior Work</H3>
            <P>
                The main contribution of the previous team was the construction of RoboJay&apos;s body, including
                motors, drivers, and several sensors. There had also been some initial work done on developing the user
                interface and virtual avatar performing the tour.
            </P>
            <Collage images={images} rowSizes={[4]} />
            <P>
                To give an idea of how RoboJay would move, the small scale{' '}
                <Link href="https://www.ucsdrobotics.org/edumip">eduMIP robot</Link> is essentially a small scale
                version of RoboJay:
            </P>
            <YouTube videoId="PTUaDSryKVE" />
            <br />
            <P>
                The eduMIP balances on its two wheels and can easily drive around flat surfaces. RoboJay was intended to
                balance and navigate in the same way, though it had training wheels affixed due to complications in
                tuning the dynamics, as well as safety concerns while untested.
            </P>
            <H3>Localization and Navigation</H3>
            <P>
                For the short amount of time I worked on the project, I built a system for determining the robot&apos;s
                position on campus, and navigating along a preplanned path. At a high level, the system performs sensor
                fusion between the wheel odometry and a GPS sensor to provide an accurate estimate of RoboJay&apos;s
                position and orientation on the map. The existing RoboJay body included high accuracy rotary encoders
                attached to each wheel, which made them ideal for tracking fine scale motion not easily detectable by a
                GPS. I hooked the rotary encoders up to a new BeagleBone Blue microcontroller, which served as the main
                sensor and control interface for the robot. The BeagleBone communicates with a laptop that consumes the
                sensor data, runs the sensor fusion algorithm, and generates high level commands for the robot to follow
                based on its location (the GPS is hooked directly to the computer since it requires specific computer
                drivers to run).
            </P>
            <div className="flex flex-row justify-center ">
                <SingleImageCollage className="w-[75%]" image={block_diagram_inverted} />
            </div>
            <br />
            <P>
                With this system, I was able to successfully demonstrate RoboJay localizing its position around campus,
                and commanding navigation towards preplanned waypoint sequences. Unfortunately I too graduated before
                RoboJay could be completed, but the project was handed off to new members in the JHU Robotics Club.
            </P>
        </>
    )
}

export default Page
