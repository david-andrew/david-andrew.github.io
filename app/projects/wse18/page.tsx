import { P, Link, H3, OL } from "@/app/(components)/ui";
import { YouTube } from "@/app/(components)/youtube";
import { IconBullet, IconBulletList } from "@/app/(components)/icon_bullet";
import { Collage, SingleImageCollage } from "@/app/(components)/collage";
import architecture from '@/app/(images)/wse18/architecture.png'
import { getImages } from "@/app/projects/fetch";



const Page = async (): Promise<JSX.Element> => {
    const gatekeeper_images = await getImages('wse18/gatekeeper');
    const kiosk_images = await getImages('wse18/kiosk');
    const promo_images = await getImages('wse18/promo');
    
    return (
        <>
            <P>
                At the end of the Mechanical Engineering program at JHU, students participate in Senior Design, a final, year-long capstone project where
                they apply all of the tools and skills they&apos;ve learned to real world problems, sponsored by real companies. My team of three developed
                a biometric access and security system for our sponsor, the JHU WSE machine shop.
            </P>
            <H3>Background</H3>
            <P>
                The Whiting School provides a student machine shop with various machines, such as lathes, mills, wire EDM, etc. for use by various labs and
                departments around campus. Students with proper safety training, and access to a valid budget may use the machine shop for school and
                research projects. It goes without saying that a machine shop is quite a dangerous facility, especially for people who lack proper training
                for each piece of equipment. Historically the WSE machine shop operated on the honor system&mdash;students would participate in a short
                training course for each piece of equipment, and then after each use of a machine, fill out a form indicating which machine, how long, and
                which budget to charge. The system was frequently abused, with both untrained students operating machines, in addition to individuals
                &apos;forgetting&apos; to charge their machine time. So in order to mitigate these issued, the machine shop tasked my team to devise an
                interlock system for controlling access to machines, and automatically billing usage.
            </P>
            <YouTube videoId="rs2gCPOII2A"/>
            <H3>Solution Overview</H3>
            <P>
                My team&apos;s solutions seeks to solve the following problem: Ensure that people operating machines in the machine shop have the proper
                training, and ensure that all machine usage is properly billed. To solve this, we developed a software controlled interlock system that uses
                fingerprint biometrics to track who is using what machines.
            </P>
            <SingleImageCollage image={architecture} />
            <P>
                To use a machine, a user must verify their identity by scanning their fingerprint. The system then checks a database to ensure the user
                possesses the proper training for the machine they are accessing. If the user is trained, they then can select one of their valid budgets to
                bill. Once these steps are complete, the system then unlocks the machine by activating a power relay which connects the machine to main
                power. The user then uses the machine, and when they are finished, the system locks the machine and logs the amount of time to bill the user
                for.
            </P>
            <H3>Why Fingerprints</H3>
            <P>
                For this specific problem, there are several compounding factors that led us to choose fingerprint biometrics for user verification. In
                general, when trying to verify an individual&apos;s identity, typically there are three types of credentials you can use:
            </P>
            <OL>
                <li>Something only you &quot;know&quot;, e.g. a password, answer to a security question, etc.</li>
                <li>Something only you &quot;have&quot;, e.g. a physical key, a cell phone, an ID card, etc.</li>
                <li>Something only you &quot;are&quot;, i.e. unique biometric signatures such as a fingerprint, face scan, handwriting, dna, etc.</li>
            </OL>
            <P>
                For many systems, the first two are often adequate to confidently verify user identity. For example, to log into a bank account with
                2-factor authentication (2FA), a user will enter their password, which only they know, and then enter a code generated on their phone which
                verifies that they have a unique object, i.e. their phone. When presented with these secure identifiers, the bank can be sure of the
                user&apos;s identity, and unlock their account.
            </P>
            <P>
                For our system however, the first two forms of identification are not adequate, because our users are prone to behave in an adversarial way
                towards our system. For a bank password/2FA code, both the bank and the user want to ensure that it is only the user that has access to the
                bank account&mdash;i.e. users don&apos;t want their password to be stolen. In the machine shop though, a common situation is one where a
                campus club or design team (e.g. Baja SAE, Rocketry, JHU ASME, etc.) might compel members to perform a task on a machine they are not
                trained, due to time crunch. In this situation, trained members who possess any hypothetical credentials would be incentivised to give them
                away to the untrained members. Historically, keycard access was required to enter the machine shop, and trained club members would
                frequently give their access card to untrained members, so that a task could be completed more quickly.
            </P>
            <P>
                To solve this issue of potentially adversarial users, we chose to authenticate via biometrics, which are not easily transferable to other
                individuals&mdash;an individual cannot easily &quot;give&quot; someone else their fingerprint, facial features, their iris pattern, etc.,
                which makes them quite an attractive option to ensure that the user is always who they say they are. An added benefit for the user is that
                biometrics are seamless&mdash;no passwords to remember, and no special ID cards to bring everywhere.
            </P>
            <H3>Gatekeeper UI</H3>
            <P>
                In order to make the system as seamless as possible, I developed a custom touch screen user interface. The UI was written in Qt, and runs on
                a so-called Gatekeeper&mdash;A Raspberry Pi connected to the interlock mechanism that controls the whole system. The Gatekeeper UI allows a
                user to select a budget to bill machine usage, as well as providing useful feedback and messages during the session.
            </P>
            <Collage images={gatekeeper_images} rowSizes={[3, 3]} />
            <H3>Kiosk UI</H3>
            <P>
                Additionally I developed a companion UI to run the kiosk system, used to register new users into the system. The kiosk provides also
                provides many administrative functions for the system, such as adding and modifying budgets, machines, and users in the system.
            </P>
            <Collage images={kiosk_images} rowSizes={[4]} />
            <H3>Back End</H3>
            <P>
                In addition to the user facing UI and Gatekeeper, I supported the development of several back end components of the system. When a user
                scans their finger at a gatekeeper, the gatekeeper connects over a network to a server which provides records of which fingerprints match to
                which users, as well as budgets, machine authorization, etc. possessed by the user. The back end is written in python, and is split into two
                parts: a host running on a university maintained server, and a client running on each gatekeeper and kiosk connected to the system. The host
                serves a SQLite database, in addition to performing several bookkeeping tasks such as emailing admins a monthly billing report, recording
                incidents (e.g. failed login attempts), and emailing admins a new system override code at the start of each week. The client manages all
                non-UI related tasks, mainly managing the fingerprint matching process, and controlling all connected peripherals, like the interlock relay,
                and machine usage monitoring sensors.
            </P>
            <H3>Pictures</H3>
            <Collage images={promo_images} />
            <P>Shots of one of several Gatekeepers installed in the machine shop, as well as the kiosk system.</P>
            <H3>Live Demo</H3>
            <YouTube videoId="iTQsDDEW6qs"/>
            <br/>
            <P>
                User logging in and unlocking a machine. Note that the long duration of processing after scanning the fingerprint was updated in a later
                version.
            </P>
            <H3>Documents</H3>
            <IconBulletList>
                <IconBullet icon="docs">
                    <Link href="/docs/wse18/final_report.pdf">
                        Final Report
                    </Link>
                </IconBullet>
                <IconBullet icon='table'>
                    <Link href="/docs/wse18/poster.pdf">
                        Design Day Poster
                    </Link>
                </IconBullet>
                <IconBullet icon="object group">
                    <Link href="/docs/wse18/final_presentation.pdf">Design Day Presentation</Link>
                </IconBullet>
            </IconBulletList>
        </>
    )
}

export default Page;
