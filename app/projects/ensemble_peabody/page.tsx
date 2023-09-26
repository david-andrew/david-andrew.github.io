import { ProjectMeta } from "../projects";
import logo from '../../(images)/logo.png'

export const meta: ProjectMeta = {
    title: 'Hacking Harmony or The Demon Chipmunk Choir',
    imgSrc: logo,
    github: 'Ensemble',
    internalLink: '/projects/ensemble_peabody',
    summary: '2019 Peabody Hackathon Submission. Choral music synthesis via autotuned google text-to-speech, AKA the demon chipmunk choir',
    tags: ['Google text-to-speech API', 'matlab', 'python'],
};

const Page = (): JSX.Element => {
    return <h1>Hacking Harmony</h1>
}

export default Page;