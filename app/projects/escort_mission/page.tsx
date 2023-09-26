
import { ProjectMeta } from "../projects";
import escort_mission from '../../(images)/projects/escort_mission_lamb.png'

export const meta: ProjectMeta = {
    title: 'Escort Mission 2020',
    imgSrc: escort_mission,
    github: 'escort_mission_2020',
    internalLink: '/projects/escort_mission',
    summary: 'Submission for the 2020 GMTK Game Jam',
    tags: ['Godot', 'GDScript', '2D game'],
};

const Page = (): JSX.Element => {
    return <h1>Escort Mission 2020</h1>
}

export default Page;
