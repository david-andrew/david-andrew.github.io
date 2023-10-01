
import { ProjectMeta } from "../types";
import logo from '../../(images)/logo.png'

export const meta: ProjectMeta = {
    title: 'Ziggy V (Working Title)',
    imgSrc: logo,
    internalLink: '/projects/ziggy_v',
    summary: 'Concept for a Real-Time-Strategy crossed with First-Person-Shooter',
    lastUpdated: 'January 2021', //TODO->repo is private,
    tags: ['Godot', 'GDScript', 'FPS x RTS', '3D game'],
};

const Page = (): JSX.Element => {
    return <h1>Ziggy V (Working Title)</h1>
}

export default Page;
