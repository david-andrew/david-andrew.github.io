import { ProjectMeta } from "../(old)summaries";
import logo from '../../(images)/logo.png'

export const meta: ProjectMeta = {
    title: 'RoboJay',
    imgSrc: logo,
    lastUpdated: 'May 2018',
    summary: 'A balancing robot designed to give campus tours to incoming JHU freshmen',
    internalLink: '/projects/robojay',
}

const Page = (): JSX.Element => {
    return <h1>RoboJay</h1>
}

export default Page;