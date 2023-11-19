import { YouTube } from "@/app/(components)/youtube";
import { P, H3, Link, OL } from "@/app/(components)/ui";
import { IconBullet, IconBulletList } from "@/app/(components)/icon_bullet";
import { Collage, SingleImageCollage } from "@/app/(components)/collage";
import mona_lisa_contour from "@/app/(images)/drawbot/mona_lisa_contour.jpg";
import { getImages } from '@/app/projects/fetch'

const Page = async (): Promise<JSX.Element> => {
    const images = await getImages('drawbot/end_effector')
    return (
        <>
            <P>
                As a part of the Robotics Master&apos;s degree, students are required to take Robot Kinematics, Dynamics, and Control (EN.530.646), a
                rigorous overview of the math used in robotics. Honestly, I would describe it as the hardest math course I ever took, but by the end, we had
                the opportunity to program the <Link href="https://www.universal-robots.com/products/ur5-robot/">UR5 Robot Arm</Link> using
                our hard earned knowledge.
            </P>
            <P>
                For the final project, there were two components:
            </P>
            <OL>
                <li>Pick up a block on a table and move it to a target</li>
                <li>Any application of your choosing&mdash;my group decided to make a drawing robot</li>
            </OL>
            <P>
                For the first task, you had to implement two different control schemes for moving the robot arm in 3D space. Along with a third provided
                control scheme, the task was to then use all three controllers to run a sequence of moving the arm to the start location above a block,
                closing the gripper on the block, and then moving the block to a target location and releasing it. For this part of the project, my
                teammates programmed the low-level control algorithms while I handled the high-level sequencing for performing the task.
            </P>
            <P>
                For the second part, we decided to fix a tool to the robot holding a marker, and have it draw pictures on a whiteboard. I handled the bulk
                of the work for this part, including fabricating a tool to hold the marker, and writing all the code for robot calibration and converting
                images into robot trajectories.
            </P>
            <div className="flex justify-center">
                <SingleImageCollage className="w-[70%]" image={mona_lisa_contour} />
            </div>
            <br />
            <P>
                Images are converted directly to a contour plot based on the brightness of pixels. The level set contours are then transformed from 2D into
                world space for the robot to draw. Once the robot position is calibrated, the robot then performs the task of tracing along each of the
                contours from the image.
            </P>
            <H3>Custom Marker End Effector</H3>
            <P>
                The custom end effector is simply a marker holder with a spring at the bottom to allow for slight errors in the robot&apos;s positional
                calibration.
            </P>
            <Collage images={images}/>
            <H3>Video Demo</H3>
            <YouTube videoId="FeDsPanEYDo"/>
            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon='docs'>
                    <Link href="/docs/drawbot/final_report.pdf" target="_blank">
                        Final Report
                    </Link>
                </IconBullet>
                <IconBullet icon='hashtag'>
                    <Link href="/docs/drawbot/project_code.zip">
                        Project Code
                    </Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default Page;
