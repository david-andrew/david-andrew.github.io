import { YouTube } from "@/app/(components)/youtube";
import { Link, P, H3 } from "@/app/(components)/ui";
import { Collage, SingleImageCollage } from "@/app/(components)/collage";
import { getImages } from '@/app/projects/fetch'
import Image from "next/image";
import cad_design from '@/app/(images)/foxing_animatronic/cad_design.png';
import joystick_demo from '@/app/(images)/foxing_animatronic/joystick_demo.gif';

const Page = async (): Promise<JSX.Element> => {
    const images = await getImages('foxing_animatronic/album');

    return (
        <>
            <P>
                Early in 2018, I was tasked by the band Foxing to help develop an animatronic for an upcoming music video they were shooting. They were
                looking for a mechanically controlled puppet reminiscent of the alien chestburster puppet used in the original Alien movie:
            </P>
            <YouTube videoId="I6D5sPitfgo" />
            <br />
            <P>
                They wanted the same style of mechanism, but wanted it to be more slender, reminiscent of a plant or flower. The band had also hired
                sculpter <Link href="https://www.instagram.com/jake_sculpts/">Jake Corrick</Link> to model the exterior of the prop,
                so my task was mainly to develop the internal structure and control mechanisms, and ensure that it matched the vision Foxing was going for.
            </P>
            <P>
                I opted for laser cut acrylic with a stiff plastic spine and thin steel cables to control the mechanism. The final design for the body is
                shown below.
            </P>
            <SingleImageCollage image={cad_design} />
            <br />
            <P>
                To control it, I fabricated dual joysticks out of steel and aluminum T-slot extrusions, as well as a pair of bicycle brake mechanism. One
                joystick controls the lower body, with cables running up only halfway through the robot, while the other joystick controls the upper body.
                The bicycle brakes attach to cables that actuate the arms as well as the head petal mechanism. The entire control assembly was mounted to a
                piece of plywood from which the steel cables had a strong anchor to pull against.
            </P>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image src={joystick_demo} style={{ width: '50%' }} alt='joystic demo' />
            </div>
            <br />
            <P>
                The biggest difficulty I encountered with the project was the slender proportions they wanted. With such a thin frame, the cables needed to
                be as thin as possible to fit through the small holes in each disk on the body, which meant they were more fragile than thicker
                cabling&mdash;I calculated that there was almost no margin of safety for the breaking strength of the control cables. Ultimately, it took a
                lot of careful and delicate work to ensure the whole mechanism would work as intended without breaking.
            </P>
            <H3>Pictures</H3>
            <Collage images={images} />
            <H3>Final Music Video (Warning: Blood/Unsettling Medical Imagery)</H3>
            <YouTube videoId="AopbOIH37gs"/>
        </>
    )
}

export default Page;
