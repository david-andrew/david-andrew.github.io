import { P, H3 } from "@/app/(components)/ui";
import { YouTube } from "@/app/(components)/youtube";

const Page = (): JSX.Element => {
    return (
        <>
            <H3>About</H3>
            <P>
                In fall 2015 I attended my first hackathon. With a team of 3, we built a very simple app that allowed you to use custom sounds for a midi
                keyboard. The app itself is a just a simple webpage with a virtual keyboard, and options to upload your audio file. Additionally the app can
                playback midi files, leading to much hilarity. My role mainly consisted of handling the music side of the project, e.g. generating suitable
                midi files, figuring out how to handle pitch shifting, etc., while my teammates focused on building the app and intefaces.
                <br />
                <br />
                While quite silly, our project actually ended up winning a prize for crowd favorite.
            </P>
            <H3>HopHacks Demo</H3>
            <YouTube videoId="rpgYMfEShjQ" opts={{ width: '100%' }} />
        </>
    );
}

export default Page;
