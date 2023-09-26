import { ProjectMeta } from "../projects";
import logo from '../../(images)/logo.png'

export const meta: ProjectMeta = {
    title: 'Musical DL',
    imgSrc: logo,
    lastUpdated: 'June 2022',
    internalLink: '/projects/musical_dl',
    summary: 'Using deep learning to generate choral music in the style of JS Bach',
    tags: ['Python', 'Pytorch', 'AI/ML', 'choral', 'music', 'generation'],
};

const Page = (): JSX.Element => {
    return <h1>Musical DL</h1>
}

export default Page;
