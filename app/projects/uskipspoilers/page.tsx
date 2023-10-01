
import { ProjectMeta } from "../types";
import logo from '../../(images)/logo.png'

export const meta: ProjectMeta = {
    title: 'uSkipSpoilers',
    imgSrc: logo,
    github: 'uSkipSpoilers',
    internalLink: '/projects/uskipspoilers',
    summary: 'A small chrome extension for blocking spoilers in YouTube videos',
    tags: ['React', 'TypeScript', 'Chrome', 'Extension'],
};

const Page = (): JSX.Element => {
    return <h1>uSkipSpoilers</h1>
}

export default Page;
