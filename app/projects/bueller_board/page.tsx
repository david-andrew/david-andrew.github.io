
import { ProjectMeta } from "../projects";
import logo from '../../(images)/logo.png'

export const meta: ProjectMeta = {
    title: 'Bueller Board',
    imgSrc: logo,
    internalLink: '/projects/bueller_board',
    summary: "Fall 2015 HopHacks submission: Midi keyboard that used user provided audio samples, a.k.a. the 'goat keyboard'",
    lastUpdated: 'September 2015',
    tags: ['midi', 'music'],
};

const Page = (): JSX.Element => {
    return <h1>Bueller Board</h1>
}

export default Page;
