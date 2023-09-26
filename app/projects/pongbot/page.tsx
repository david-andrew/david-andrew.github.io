
import { ProjectMeta } from "../projects";
import logo from '../../(images)/logo.png'

export const meta: ProjectMeta = {
    title: 'pOngBot',
    imgSrc: logo,
    
    internalLink: '/projects/pongbot',
    
    summary: 'Autonomous beer pong playing robot',
    lastUpdated: 'June 2020',
    tags: ['Arduino', 'C++', 'computer vision', 'Viola-Jones', 'mechanical design'],
};

const Page = (): JSX.Element => {
    return <h1>pOngBot</h1>
}

export default Page;
