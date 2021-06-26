import React from 'react'
import { PageContainer, PageHeading } from '../../Components'
import YouTube from 'react-youtube'

export const WSE18 = (): JSX.Element => {
    return (
        <>
            <PageContainer>
                <PageHeading title="WSE18: Machine Shop Biometric Interlock" subtitle="" />
                <p>
                    At the end of the Mechanical Engineering program at JHU, students participate in Senior Design, a final, year-long capstone project where
                    they apply all of the tools and skills they&apos;ve learned to real world problems, sponsored by real companies. My team of three developed
                    a biometric access and security system for our sponsor, the JHU WSE machine shop.
                </p>
                <h3>Background</h3>
                <p>
                    The Whiting School provides a student machine shop with various machines, such as lathes, mills, wire EDM, etc. for use by various labs and
                    departments around campus. Students with proper safety training, and access to a valid budget may use the machine shop for school and
                    research projects. It goes without saying that a machine shop is quite a dangerous facility, especially for people who lack proper training
                    for each piece of equipment. Historically the WSE machine shop operated on the honor system&mdash;students would participate in a short
                    training course for each piece of equipment, and then after each use of a machine, fill out a form indicating which machine, how long, and
                    which budget to charge. The system was frequently abused, with both untrained students operating machines, in addition to individuals
                    &apos;forgetting&apos; to charge their machine time. So in order to mitigate these issued, the machine shop tasked my team to devise an
                    interlock system for controlling access to machines, and automatically billing usage.
                </p>
                <YouTube videoId="rs2gCPOII2A" opts={{ width: '100%' }} />
                <h3>Solution Overview</h3>
                <p>(.security systems: know vs have vs are. + users are adversaries.)</p>
            </PageContainer>
        </>
    )
}
