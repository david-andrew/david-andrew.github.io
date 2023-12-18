import { P, H3, Link, UL } from '@/app/(components)/ui'
import { YouTube } from '@/app/(components)/youtube'
import { Collage, SingleImageCollage } from '@/app/(components)/collage'
import { IconBullet, IconBulletList } from '@/app/(components)/icon_bullet'
import { getImages } from '@/app/projects/fetch'
import rebel_crash from '@/app/(images)/astrojays/rebel_crash.jpg'

const Page = async (): Promise<JSX.Element> => {
    const rebel1_imageSrcs = await getImages('astrojays/rebel_level_1')
    const rebel2_imageSrcs = await getImages('astrojays/rebel_level_2')
    const sac_imageSrcs = await getImages('astrojays/sac')

    return (
        <>
            <P>
                During my senior year of college, I helped a friend found the JHU Rocketry Club, now known as the{' '}
                <Link href="https://www.facebook.com/HopkinsRocketry/">AstroJays</Link>. The goal of the club was to
                allow students to participate in High Power Rocket (HPR) activities, i.e. launching rockets for fun, or
                in collaboration with other research efforts on campus.
            </P>
            <H3>HPR Certification Levels</H3>
            <P>
                Early on in the club, members were provided kits for level 1 class rockets, so that they could start
                working their certification levels. To give a brief overview, hobby rockets with motors ranging from
                class H to class O are regulated, and require levels of certification to legally operate. Class
                partitions per motor size are as follows:
            </P>
            <UL>
                <li>Level 1: Class H - I</li>
                <li>Level 2: Class J - L</li>
                <li>Level 3: Class M - O</li>
            </UL>
            <P>
                Anything beyond class O is no longer considered hobby level, and requires specific approval from various
                regulatory bodies like the FAA. To earn a level certification, an individual must demonstrate a working
                rocket with that level of motor (known as a certification flight). Certification flights are the only
                time when someone with a lower level certification may use a higher class level of motor. Ultimately the
                goal was for the club to design and build a custom level 3 rocket for the Spaceport America Cup, but
                that meant that someone in the club needed to be at least level 2 certified, in order to handle the
                level 3 motor.
            </P>
            <H3>Rebel Scum</H3>
            <P>
                For my certification attempts, I started with the{' '}
                <Link href="https://www.apogeerockets.com/Rocket_Kits/Skill_Level_3_Kits/Hi-Tech">High-Tech</Link>{' '}
                rocket kit sold at Apogee Rockets. The level 1 certification simply required me to build the kit, and
                successfully launch and recover the rocket via the normal parachute system. My certification flight went
                perfectly, and I recovered my rocket completely intact.
            </P>
            <Collage images={rebel1_imageSrcs} />
            <P>
                Following my level 1 certification, I began to retrofit my rocket for a level 2 certification flight.
                The requirements for a level 2 flight include using a motor from the J-L range, as well as demonstrating
                an electronic avionics system&mdash;because level 2 rockets fly so much higher, they require a drogue
                parachute to deploy at apogee, and then rely on an electronics system to deploy the main chute closer to
                the ground. You also have to pass a written test, in addition to the flight, in order to complete the
                level 2 certification process.
            </P>
            <P>To upgrade my rocket, performed the following modifications:</P>
            <UL>
                <li>replaced engine mount with custom structure designed for a larger class J motor</li>
                <li>added an arduino based avionics system for detecting altitude and activating the main chute</li>
                <li>replaced the old fins with twice as many to ensure stability</li>
                <li>added a new coat of paint and decals</li>
            </UL>
            <P>The it was with the addition of the Star Wars decals that the rocket earned the name Rebel Scum.</P>
            <Collage images={rebel2_imageSrcs} rowSizes={[2, 2, 2]} />
            <div className="flex flex-row justify-center max-sm:hidden">
                <div className="w-[60%]">
                    <YouTube videoId="teXu-0AXwcE" portrait />
                </div>
            </div>
            <YouTube className="sm:hidden" videoId="teXu-0AXwcE" portrait />
            <br />
            <P>
                Unfortunately the rocket did not separate at apogee, causing it to ballistically arc downward and crash
                into the ground.
            </P>
            <SingleImageCollage image={rebel_crash} />
            <br />
            <P>
                Upon inspecting the wreckage, I did note that the parachute mechanism had activated, so it likely would
                have been a successful flight had separation occurred. I suspect the lack of separation was due to the
                increased mass of the new components, which provided too much inertial resistance for the separation
                charge to overcome.
            </P>
            <H3>Spaceport America Cup</H3>
            <P>
                In the summer of 2018, I traveled with two other club members to New Mexico to participate in the{' '}
                <Link href="https://spaceportamericacup.com/">Spaceport America Cup</Link>. During the year, members of
                the club had all collaborated to construct a level 3 rocket for the competition, which would carry a
                fluidics experiment developed by one of the research labs at JHU.
            </P>
            <Collage images={sac_imageSrcs} />
            <P>
                Ultimately, we couldn&apos;t launch at the competition due to a few structural inadequacies discovered
                at the launch site, but the team earned good marks for the design of the rocket and its novel experiment
                payload. After I graduated, the club repurposed the level 3 motor for a new rocket being developed in
                conjunction with a custom hybrid rocket engine.
            </P>
            <H3>Links</H3>
            <IconBulletList>
                <IconBullet icon="object group">
                    <Link href="/docs/astrojays/SAC_poster.pdf">SAC Poster</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default Page
