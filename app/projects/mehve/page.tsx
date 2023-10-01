
import { ProjectMeta } from "../types";
import logo from '../../(images)/logo.png'

export const meta: ProjectMeta = {
    title: 'Mehve (Working Title)',
    imgSrc: logo,
    github: 'mehve',
    internalLink: '/projects/mehve',
    summary: '3D adventure game inspire by "Nausicaa of the Valley of the Wind"',
    tags: ['Godot', 'GDScript', '3D game'],
};

const Page = (): JSX.Element => {
    return <h1>Mehve (Working Title)</h1>
}

export default Page;
