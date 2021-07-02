import React from 'react'
import { PageContainer, PageHeading, Collage } from '../../Components'
import block_diagram from '../../images/robojay/block_diagram.png'
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
                <h3>Localization and Navigation</h3>
                <p>
                    For the short amount of time I worked on the project, I built a system for determining the robot&apos;s position on campus, and navigating
                    along a preplanned path.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={block_diagram_inverted} style={{ width: '75%' }} />
                </div>
                <br />
            </PageContainer>
        </>
    )
}
