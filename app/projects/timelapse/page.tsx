import { ProjectMeta } from "../types";
import timelapse from '../../(images)/projects/timelapse.jpg';

export const meta: ProjectMeta = {
    title: 'Cloud Timelapse',
    imgSrc: timelapse,
    github: 'timelapse',
    internalLink: '/projects/timelapse',
    summary: 'A simple python project for taking timelapses of clouds from a webcam',
    tags: ['Python', 'OpenCV', 'Raspberry Pi', 'timelapse', 'clouds'],
};

const Page = (): JSX.Element => {
    return <h1>Cloud Timelapse</h1>
}

export default Page;
