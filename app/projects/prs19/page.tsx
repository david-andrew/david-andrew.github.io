
import { ProjectMeta } from "../types";
import prs2019_preview from '../../(images)/projects/prs2019_preview.png'

export const meta: ProjectMeta = {
    title: 'PRS19: Fret Press Robot',
    imgSrc: prs2019_preview,
    github: 'PRS_robot',
    internalLink: '/projects/prs19',
    summary: "Automatic guitar fret press robot. Mechanical Engineering Master's Design captsone project",
    tags: ['C++', 'Arduino', 'mechanical design'],
};

const Page = (): JSX.Element => {
    return <h1>PRS19: Fret Press Robot</h1>
}

export default Page;
