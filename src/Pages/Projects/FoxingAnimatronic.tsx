import React from 'react'
import { Collage, PageContainer, PageHeading } from '../../Components'
import { ClearFixAfter, ExternalLink } from '../../utilities'
import YouTube from 'react-youtube'
import cad_design from '../../images/foxing_animatronic/cad_design.png'
import joystick_demo from '../../images/foxing_animatronic/joystick_demo.gif'

export const FoxingAnimatronic = (): JSX.Element => {
    //image objects for photo collage
    const r = require.context('../../images/foxing_animatronic/album')
    const imageSrcs = r.keys().map((path: string) => r(path).default) as string[]

    return (
        <>
            <PageContainer>
                <PageHeading title="Foxing Animatronic" subtitile="June 2018" />
                <p>
                    Early in 2018, I was tasked by the band Foxing to help develop an animatronic for an upcoming music video they were shooting. They were
                    looking for a mechanically controlled puppet reminiscent of the alien chestburster puppet used in the original Alien movie:
                </p>
                <YouTube videoId="I6D5sPitfgo" opts={{ width: '100%' }} />
                <br />
                <p>
                    They wanted the same style of mechanism, but wanted it to be more slender, reminiscent of a plant or flower. The band had also hired
                    sculpter <ExternalLink href="https://www.instagram.com/jakecorricksculpture">Jake Corrick</ExternalLink> to model the exterior of the prop,
                    so my task was mainly to develop the internal structure and control mechanisms, and ensure that it matched the vision Foxing was going for.
                    <br />
                    <br />I opted for laser cut acrylic with a stiff plastic spine and thin steel cables to control the mechanism. The final design for the body
                    is shown below.
                </p>
                <img src={cad_design} style={{ width: '100%' }} />
                <ClearFixAfter />
                <br />
                <p>
                    To control it, I fabricated dual joysticks out of steel and aluminum T-slot extrusions, as well as a pair of bicycle brake mechanism. One
                    joystick controls the lower body, with cables running up only halfway through the robot, while the other joystick controls the upper body.
                    The bicycle brakes attach to cables that actuate the arms as well as the head petal mechanism. The entire control assembly was mounted to a
                    piece of plywood from which the steel cables had a strong anchor to pull against.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={joystick_demo} style={{ width: '50%' }} />
                </div>
                <p>
                    <br />
                    <br />
                    The biggest difficulty I encountered with the project was the slender proportions they wanted. With such a thin frame, the cables needed to
                    be as thin as possible to fit through the small holes in each disk on the body, which meant they were more fragile than thicker cabling--I
                    calculated that there was almost no margin of safety for the breaking strength of the control cables. Ultimately, it took a lot of careful
                    and delicate work to ensure the whole mechanism would work as intended without breaking.
                </p>
                <h3>Pictures</h3>
                <Collage imageSrcs={imageSrcs} />

                <h3>Final Music Video (Warning: Blood/Unsettling Medical Imagery)</h3>
                <YouTube videoId="AopbOIH37gs" opts={{ width: '100%' }} />
            </PageContainer>
        </>
    )
}
