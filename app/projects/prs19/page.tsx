import { Link, H3, P, OL } from "@/app/(components)/ui";
import { IconBullet, IconBulletList } from "@/app/(components)/icon_bullet";
import { YouTube } from "@/app/(components)/youtube";
import { Collage } from "@/app/(components)/collage";
import { getImages } from "@/app/projects/fetch"
import glue from '@/app/(images)/prs19/glue.gif'
import laser from '@/app/(images)/prs19/laser.gif'
import press from '@/app/(images)/prs19/press.gif'
import Image from "next/image";

const Page = async (): Promise<JSX.Element> => {
    const images = await getImages('prs19/album')

    return (
        <>
            <P>
                In the last semester of my Master&apos;s degree, I took part in the Mechanical Engineering Master&apos;s Design Project (EN.530.614).
                Essentially <Link href="/projects/wse18">Mechanical Engineering Senior Design</Link> with expanded scope and difficulty, the
                course is a year-long design project where students design, fabricate, and test solutions for sponsor companies&apos; design problems. I
                joined the Paul Reed Smith (PRS) team near the end of the project, and developed the entire software suite for running their automatic fret
                press robot.
            </P>
            <H3>Background</H3>
            <P>
                <Link href="https://prsguitars.com/">Paul Reed Smith Guitars</Link> manufactures guitars largely by hand, making use of
                automated techniques when it is possible to maintain quality. One particular process they were interested in automating was that of gluing
                and pressing frets into the guitar neck&mdash;for each fret, a precise quantity of glue needs to be laid down in the fret slot, followed by
                placing and then pressing a fret on top. The task itself is somewhat intricate, but also incredibly repetitive, leading to burnout among
                employees performing it.
            </P>
            <YouTube videoId="odeBP5sQw2I"/>
            <br />
            <P>
                In 2018, PRS sponsored a JHU Senior Design team to design and build a robot for automating the process. Ultimately the scope of the project
                was too much to be completed in a single year, so PRS extended the project into 2019, and JHU Mechanical Engineering had a small team of
                Master&apos;s students take over its completion. I joined the Master&apos;s team during the final semester of the project, and was tasked
                with writing the entirety of the software needed to control and operate the robot.
            </P>
            <H3>Robot Design</H3>
            <Collage images={images} />
            <H3>Technical</H3>
            <P>
                The main features of the robot include the sliding fret board platform, the glue arm, the presser mechanism, and the laser fret slot sensor.
                It is all controlled by a single Arduino Mega, which monitors the various sensors and controls the stepper motors and pneumatics. To press
                the frets, the robot performs the following steps:
            </P>
            <OL>
                <li>Measure the slot location by sliding the fret board in front of the laser</li>
                <li>Move the fret board to align the slot with the glue arm</li>
                <li>Swing the glue arm towards the fret board</li>
                <li>When the glue arm reaches the start of the fret board, activate the pneumatic valve to dispense glue</li>
                <li>When the glue arm reaches the end of the fret board, deactivate the glue valve</li>
                <li>Move the fret board so that the glue arm aligns with the next slot</li>
                <li>Repeat the glue process, reversing the motion of the glue arm, towards its original position</li>
                <li>Move the fret board so that the slot aligns with the press mechanism</li>
                <li>Swing the press mechanism over top of the fret board</li>
                <li>Activate the pneumatic dropping the press mechanism and fret wire into the slot</li>
                <li>Retract the press mechanism (this unspools fret wire for the next slot)</li>
                <li>Activate the pneumatics to close the snippers, and cut the fret wire</li>
                <li>Deactivate the pneumatics to open the snippers</li>
                <li>Repeat the above steps for the rest of the frets on the fret board</li>
            </OL>
            <H3>Software</H3>
            <P>
                To control the robot, I developed a C++ driver program, and a number of support modules. For development and debugging, the code makes
                extensive use of the Arduino&apos;s serial communication capabilities&mdash;keywords with optional parameters can be sent to the robot to
                instruct it to perform any of its possible operations (e.g. jog the fret board platform to a certain location, activate a specific pneumatic
                valve, measure the laser intensity, etc.). For normal operations, I wrote modules to provide convenient interfaces for each component of the
                robot, including low level components like stepper motors, limit switches, pneumatics, and also higher level components, like the glue arm,
                or presser subassemblies. To start the fret press sequence, an operator simply loads a fret board onto the robot, and then presses the two
                start buttons, kicking off a software sequence that runs each of the steps listed above for pressing frets.
            </P>
            <H3>Laser Fret Detector</H3>
            <P>
                In addition to software work, I also helped develop solutions for several mechanical and electrical issues facing the project. In
                particular, I developed the laser system for accurately measuring the precise location of each fret on the fret board. The robot uses the
                fret locations to know where to move the fret board so that it exactly lines up with the glue arm, as well as the press mechanism. The
                detector works by shining a laser across the path of the fret board. As the board passes in front of the laser, it occludes the beam from
                the detector. When a slot passes in front of the beam, some of the laser light is allowed through, which is picked up by a photodiode on the
                other side of the machine. In software, the peaks in brightness are then correlated with the step count from the stepper motor, indicating
                precisely where each fret is relative to the robot.
            </P>
            <H3>Videos</H3>
            <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                    <Image src={laser} style={{ width: '100%' }} alt='laser detector'/>
                    <P>Laser fret slot detection system</P>
                </div>
                <div className="flex flex-col">
                    <Image src={glue} style={{ width: '100%' }} alt='glue dispenser'/>
                    <P>Glue dispensing mechanism</P>
                </div>
                <div className="flex flex-col">
                    <Image src={press} style={{ width: '100%' }} alt='fret press'/>
                    <P>Fret press mechanism</P>
                </div>
            </div>
            <br />
            <YouTube videoId="1CZEYDhc4wY"/>
            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon="github">
                    <Link href="https://github.com/david-andrew/PRS_robot">Github Repo</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default Page;
