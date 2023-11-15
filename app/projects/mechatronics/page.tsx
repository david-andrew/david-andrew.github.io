import { P, H3, Link, H4 } from "@/app/(components)/ui";
import { Collage } from "@/app/(components)/collage";
import { getImages } from '@/app/projects/fetch'
import { YouTube } from "@/app/(components)/youtube";
import Image from "next/image";
import striker_shooting from '@/app/(images)/mechatronics/jhockey/striker_shooting.gif'
import goalie_moving from '@/app/(images)/mechatronics/jhockey/goalie_moving.gif'



const Page = async (): Promise<JSX.Element> => {
    const mazeSolver_images = await getImages('mechatronics/maze_solver');
    const balancer_images = await getImages('mechatronics/balancer');
    const jhockey_striker_images = await getImages('mechatronics/jhockey/striker');
    const jhockey_goalie_images = await getImages('mechatronics/jhockey/goalie');

    return (
        <>
            <P>
                During my final graduate semester at JHU, I participated in Mechatronics (EN.530.421) where I built several small scale robots from scratch.
            </P>
            <H3>Maze Solving Robot</H3>
            <P>
                The first robot we built was a maze solving robot. For sensors, we were allowed a single{' '}
                <Link href="https://pixycam.com/pixy-cmucam5/">PixyCam</Link>, an ultrasonic depth sensor, and a pair of flexible
                deformation sensors. For this robot, I was on a team with two other people. My responsibilities consisted of designing and fabricating the
                chassis, while they focused on programming the robot. To solve the maze, the robot may use any algorithm, as well as use the colored square
                hints placed throughout the maze.
            </P>
            <P>
                An interesting feature of the chassis design is that it was design to fit together using nothing but friction joints. This means that each
                joint is slightly larger than where it is supposed to fit, and the interference between both sides holds the parts together&mdash;no glue
                was needed, and the only fasteners were to hold components to the body. Normally, laser cut acrylic isn&apos;t cut with such tight
                tolerances, but with a little bit of experimentation, I was able to get it to work quite nicely.
            </P>
            <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex">
                    <Collage images={mazeSolver_images} />
                </div>
                <YouTube videoId="_ZzZNforl5k" opts={{ width: '100%', height: '100%' }} />
            </div>
            <H3>Balancing Robot</H3>
            <P>
                The second robot we built was a robot designed to balance along a single axis. For sensors, we were only allowed a single
                accelerometer/gyro. We worked in teams of three, and I was again tasked with designing and fabricating the robot body. Additionally we all
                ended up writing separate balancing algorithms since the problem turned out to be rather intractable.
            </P>
            <P>
                As it turned out, the motor we were provided for the robot was actually not quite strong enough for the task&mdash;it lacked sufficient
                torque to drive the system away from perturbations back to equilibrium&mdash;so no one in the class was successful in getting their robot to
                balance for arbitrarily long. To combat this on our robot, I added a balance beam to the robot which allowed us to maximize the robot&apos;s
                moment of inertia along the balance axis. Ultimately, the longest we managed to get it to balance for was the 20 seconds shown in the video
                below.
            </P>
            <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex">
                    <Collage images={balancer_images} />
                </div>
                <YouTube videoId="iOoxCsl8L_c" opts={{ width: '100%', height: '100%' }} />
            </div>
            <H3>Hockey Robots</H3>
            <P>
                The capstone project for the course involved building two robots to autonomously play hockey against another pair of robots. For this
                project, I worked on a team of three, where I again was mainly tasked with designing and fabricating the robots. For the hockey match, each
                team was to build a goalie robot, and a striker robot. The design constraints were pretty flexible, mainly just limiting the size of the
                robots. Ultimately due to time constraints, the actual hockey tournament was cancelled, but my team&apos;s robots turned out quite well,
                especially the striker.
            </P>
            <H4>Goalie</H4>
            <Collage images={jhockey_goalie_images} />
            <P>
                The goalie is relatively simple. Its main strategy is to simply drive back and forth in front of the goal, and extend an inner panel for
                extra reach. It uses the same tread drive as the striker, but in a triangular pattern, mainly to accommodate having a large gear in the
                single-stage reduction from the motors (and definitely not because it made it look more like WALL-E).
            </P>
            <H4>Striker</H4>
            <Collage images={jhockey_striker_images} />
            <P>
                The striker was built with considerations for several mistakes that cropped up while building the goalie robot. While more complicated than
                the goalie&apos;s drive train, the striker used a five-stage gear reduction. This allowed it to fit entirely inside the body, while also
                providing much more precise control over the speeds available to the robot. The striker also has a quite simple shooting mechanism. A spring
                loaded pusher plate is stretched back via an archimedes spiral. A limit switch detects when the plate is fully retracted, and then the
                spiral is rotated just a few more degrees to release the pusher plate. To shoot again, the spiral just needs to continue rotating in the
                same direction.
            </P>
            {/* <Grid columns={2}>
                <Grid.Column>
                    <Grid.Row>
                        <Image src={goalie_moving} style={{ width: '100%' }} />
                        <P>Simple clip of the goalie robot driving (via remote control) while powered by a bench power supply</P>
                    </Grid.Row>
                </Grid.Column>
                <Grid.Column>
                    <Grid.Row>
                        <Image src={striker_shooting} style={{ width: '100%' }} />
                        <P>Demonstration of the striker shooting mechanism. Uses an archimedes spiral to wind up the shooter</P>
                    </Grid.Row>
                </Grid.Column>
            </Grid> */}
            <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col">
                    <Image src={goalie_moving} style={{ width: '100%' }} alt="goalie moving" />
                    <P>Simple clip of the goalie robot driving (via remote control) while powered by a bench power supply</P>
                </div>
                <div className="flex flex-col">
                    <Image src={striker_shooting} style={{ width: '100%' }} alt='striker shooting' />
                    <P>Demonstration of the striker shooting mechanism. Uses an archimedes spiral to wind up the shooter</P>
                </div>
            </div>
            <br />
            <YouTube videoId="rFFHyE5L5rE" opts={{ width: '100%' }} />
            <br />
            <P>Demonstration of the striker robot driving (via remote control) while powered by a bench power supply</P>

        </>
    )
}

export default Page;
