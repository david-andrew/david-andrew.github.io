
import { ProjectMeta } from "../types";
import logo from '../../(images)/logo.png'

export const meta: ProjectMeta = {
    title: 'Mechatronics Robots',
    imgSrc: logo,
    internalLink: '/projects/mechatronics',
    summary: 'Robots from mechatronics',
    lastUpdated: 'May 2019',
    tags: ['Arduino', 'C++', 'SolidWorks', 'mechanical design'],
};

const Page = (): JSX.Element => {
    return <h1>Mechatronics Robots</h1>
}

export default Page;
