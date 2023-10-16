"use client";
import YouTube from "react-youtube";
import { P, H3, IconBullet, IconBulletList, Link } from "@/app/(components)/ui";
import { Collage } from "@/app/(components)/collage";
import mona_lisa_contour from "@/app/(images)/drawbot/mona_lisa_contour.jpg";
import docs from "@/app/(images)/icons/docs.png";
import hashtag from "@/app/(images)/icons/hashtag.png";
import Image, { StaticImageData } from "next/image";

export const Content = ({images}:{images:StaticImageData[]}): JSX.Element => {
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
                <ol>
                    <li>Pick up a block on a table and move it to a target</li>
                    <li>Any application of your choosing&mdash;my group decided to make a drawing robot</li>
                </ol>
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
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Image src={mona_lisa_contour} style={{ width: '70%' }} alt="contour map of mona lisa" />
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
            <YouTube videoId="FeDsPanEYDo" opts={{ width: '100%' }} />
            <H3>Links</H3>
            <IconBulletList>
                <IconBullet src={docs} alt="document icon">
                    <Link href="/docs/drawbot/final_report.pdf">
                        Final Report
                    </Link>
                </IconBullet>
                <IconBullet src={hashtag} alt="hashtag icon">
                    <Link href="/docs/drawbot/project_code.zip">
                        Project Code
                    </Link>
                </IconBullet>
            </IconBulletList>
        </>
    );
}