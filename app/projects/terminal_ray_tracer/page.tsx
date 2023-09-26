import { ProjectMeta } from "../(old)summaries";
import terminal_ray_tracer from '../../(images)/projects/terminal_ray_tracer.png'


export const meta: ProjectMeta = {
    title: 'Terminal Ray Tracer',
    imgSrc: terminal_ray_tracer,
    github: 'TerminalRayTracer',
    internalLink: '/projects/terminal_ray_tracer',
    summary: 'A dependency-free ray tracer written in C that runs directly in a linux terminal',
}

const Page = (): JSX.Element => {
    return <h1>Terminal Ray Tracer</h1>
}

export default Page;