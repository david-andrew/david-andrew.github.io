
import { ProjectMeta } from "../types";
import boat_simulator from '../../(images)/projects/boat_simulator.jpg'

export const meta: ProjectMeta = {
    title: 'Boat Simulator',
    imgSrc: boat_simulator,
    internalLink: '/projects/boat_simulator',
    summary: 'Spring 2017 HopHacks submission',
    lastUpdated: 'March 2017',
    tags: ['Unity', 'C#', '3D game'],
};

const Page = (): JSX.Element => {
    return <h1>Boat Simulator</h1>
}

export default Page;
