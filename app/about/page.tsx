import { Container, H1, H3, Divider, Link, P } from '@/app/(components)/ui'
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet'

const Content = ({ header, description }: { header: string; description: string }) => {
    return (
        <div className="flex flex-col font-gentona pl-1 py-1">
            <div className="text-xl leading-none">{header}</div>
            <div className="text-lg text-gray-400 leading-none">{description}</div>
        </div>
    )
}

const Page = () => {
    return (
        <Container>
            <H1>Skills</H1>
            <IconBulletList>
                <IconBullet icon="hashtag">
                    <Content header="Programming (Advanced)" description="Python, C, Typescript, MATLAB" />
                </IconBullet>
                <IconBullet icon="code">
                    <Content
                        header="Programming (Moderate)"
                        description="Rust, Julia, CUDA C, C++, Java, Go, 6502 ASM, FORTRAN 77, Ti-BASIC"
                    />
                </IconBullet>
                <IconBullet icon="cubes">
                    <Content
                        header="Frameworks"
                        description="PyTorch (with GPU), Yew, React, WebAssembly, Robot Operating System, OpenCV, Qt"
                    />
                </IconBullet>
                <IconBullet icon="branch">
                    <Content
                        header="Misc. Software"
                        description="Unix, Git, Godot, Unity3D, SolidWorks, PTC-Creo, Inkscape, Microsoft Office"
                    />
                </IconBullet>
                <IconBullet icon="circuit">
                    <Content
                        header="Electronics"
                        description="Raspberry Pi, Arduino, radio control, basic digital electronics (servos, logic gates, op-amps, etc.)"
                    />
                </IconBullet>
                <IconBullet icon="gears">
                    <Content
                        header="Manufacturing"
                        description="laser cutter, mill, lathe, MIG welding, drill press, band saw, chop saw"
                    />
                </IconBullet>
            </IconBulletList>
            <Divider className="bg-gray-700" />
            <H1>Education</H1>
            <H3 className="mt-0">Johns Hopkins University</H3>
            <IconBulletList>
                <IconBullet icon="jhu shield">
                    <Content
                        header="Bachelor of Science in Mechanical Engineering"
                        description="Sept. 2014 - May 2018"
                    />
                </IconBullet>
                <IconBullet icon="jhu shield">
                    <Content
                        header="Master of Science in Engineering in Robotics (Machine Learning concentration)"
                        description="Sept. 2018 - May 2019"
                    />
                </IconBullet>
            </IconBulletList>
            <Divider className="bg-gray-700" />
            <H1>Work History</H1>
            <H3 className="mt-0">Johns Hopkins Applied Physics Lab</H3>
            <IconBulletList>
                <IconBullet icon="apl shield">
                    <Content header="Intern" description="June 2016 - Aug. 2016" />
                </IconBullet>
                <IconBullet icon="apl shield">
                    <Content header="Software Engineer (part-time)" description="Sept. 2016 - July 2017" />
                </IconBullet>
            </IconBulletList>

            <H3>Innovative Defense Technologies</H3>
            <IconBulletList>
                <IconBullet icon="idt starburst">
                    <Content header="Associate Systems Engineer" description="June 2019 - Oct. 2020" />
                </IconBullet>
                <IconBullet icon="idt starburst">
                    <Content header="Systems Engineer II (Data Science)" description="Oct. 2020 - Feb. 2022" />
                </IconBullet>
            </IconBulletList>
            <H3>Jataware</H3>
            <IconBulletList>
                <IconBullet icon="jataware logo">
                    <Content header="Data Scientist" description="Feb. 2022 - Present" />
                </IconBullet>
            </IconBulletList>
            <Divider className="bg-gray-700" />

            <H1>General</H1>
            <P>
                I have 5 years of professional software engineering experience, as well as experience working with many
                state-of-the-art machine learning techniques.
            </P>
            <P>
                At Jataware, I worked on a variety of research and technical projects, with focuses on machine learning,
                and data science applications. For example, I developed a{' '}
                <Link href="https://github.com/jataware/archytas">Archytas</Link>, a library for using large language
                models to perform task via the Reason and Action (ReAct) method. There&apos;s also the related{' '}
                <Link href="https://github.com/jataware/boxytas">Boxytas project</Link> I authored, for performing
                Retrieval Augmented Generation (RAG) as well as identifying causal relations between topics, grounded
                over a corpus of PDF documents. I also researched and implemented approaches to{' '}
                <Link href="https://arxiv.org/abs/1703.05082">Selective Harvesting</Link> (i.e. efficient search +
                filtering over enormous graph networks), implemented a highly optimized graph-neural-network convolution
                algorithm in CUDA, and also developed several computer vision approaches to align paper maps with
                digital coordinates for the{' '}
                <Link href="https://criticalminerals.darpa.mil/The-Competition">USGS georeference challenge</Link>. Plus
                lots of other interesting machine learning applications and research here and there.
            </P>
            <P>
                At IDT, I focused on both machine learning, and front end development. Of note, I designed a novel
                machine learning architecture for efficiently allocating compute resources to minimize the execution
                time of High Level Architecture (HLA) federated simulations. I also implemented a custom time series
                anomaly detection ensemble model in Julia, and developed the React UI for visualizing the results.
            </P>
            <P>
                During my master&apos;s coursework I implemented a variety of ML algorithms from scratch, including MLP,
                SVM, Expectation Maximization, PCA, autoencoding, and autocorrelation/cross-correlation. Additionally,
                I&apos;ve worked with CNNs, VGG, ResNet, U-net, Viola Jones, and a variety of other architectures. For a{' '}
                <Link href="/projects/musical_dl">capstone project</Link> I developed a novel architecture that
                leveraged the WaveNet vocoder model paired with a custom convolutional transformer network to create a
                realistic choral voice synthesizer. Prior to that, at an internship with the Johns Hopkins Applied
                Physics Lab (JHUAPL), I worked on machine learning capabilities for controlling a{' '}
                <Link href="https://www.jhuapl.edu/work/projects/revolutionizing-prosthetics/research">
                    robotic limb
                </Link>{' '}
                by analyzing electromyogram (EMG) signals in an individual&apos;s upper arm.
            </P>
            <P>
                For my undergraduate coursework, I mainly focused on mechanical design, and pure software development.
                Additionally, I participated in the JHU Robotics Club, where I worked on several interesting robotics
                projects, including a <Link href="/projects/drawbot">picture drawing robot arm</Link>, a{' '}
                <Link href="/projects/pongbot">defintely not beer pong robot</Link>, and a{' '}
                <Link href="/projects/robojay">Balancing tour guide robot</Link>. I also was a member of the{' '}
                <Link href="/projects/rocketry">JHU Rocketry Club</Link>, where I earned my level 1 High Power Rocketry
                certification, attempted unsuccessfully to earn my level 2 certification, and participated in the 2018
                Spaceport America Cup. And lastly, whenever I had the opportunity, I enjoyed participating in the JHU
                hackathons held twice a year, leading to projects like{' '}
                <Link href="/projects/ensemble_peabody">Ensemble (Hacking Harmony)</Link>,{' '}
                <Link href="/projects/boat_simulator">Boat Simulator</Link>, and{' '}
                <Link href="/projects/bueller_board">Bueller Board</Link>.
            </P>
            <P>
                In my spare time, I&apos;ve worked on a number of interesting side projects, including a{' '}
                <Link href="/projects/dewy">custom programming language</Link>, a{' '}
                <Link href="/projects/so_voice">deep learning music synthesizer</Link>,{' '}
                <Link href="/projects/escort_mission">several</Link> <Link href="/projects/mehve">video</Link>{' '}
                <Link href="/projects/ziggy_v">games</Link>, as well as a few other{' '}
                <Link href="/projects/blob_opera">odds</Link> and <Link href="/projects/composer">ends</Link>.
                Typically, I like to work on things that are at the intersection of machine learning, music, or game
                development, but I also frequently find myself working on completely unrelated things, e.g. hydroponics,
                sewing, or celestial navigation.
            </P>
        </Container>
    )
}

export default Page
