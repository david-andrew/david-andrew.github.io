
import { ProjectMeta } from "../projects";
import rewind_title from '../../(images)/projects/rewind_title.png'

export const meta: ProjectMeta = {
    title: 'Rewind',
    imgSrc: rewind_title,
    internalLink: '/projects/rewind',
    summary: '2018 Video Game Desgn (EN.601.355) capstone project',
    lastUpdated: 'May 2018',
    tags: ['Unity', 'C#', '2D game'],
};

const Page = (): JSX.Element => {
    return <h1>Rewind</h1>
}

export default Page;
