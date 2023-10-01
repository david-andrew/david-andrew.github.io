
import { ProjectMeta } from "../types";
import mona_lisa_contour from '../../(images)/drawbot/mona_lisa_contour.jpg'

export const meta: ProjectMeta = {
    title: 'UR5 Draw Robot',
    imgSrc: mona_lisa_contour,
    internalLink: '/projects/drawbot',
    summary: 'UR5 robot arm project',
    lastUpdated: 'December 2017',
    tags: ['Matlab', 'UR5 robot', 'ROS'],
};

const Page = (): JSX.Element => {
    return <h1>UR5 Draw Robot</h1>
}

export default Page;
