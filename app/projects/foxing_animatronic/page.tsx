
import { ProjectMeta } from "../projects";
import foxing_animatronic from '../../(images)/projects/foxing_animatronic.png'

export const meta: ProjectMeta = {
    title: 'Foxing Animatronic',
    imgSrc: foxing_animatronic,
    internalLink: '/projects/foxing_animatronic',
    summary: "Manually actuated animatronic robot featured in the Foxing music video 'Slapstick'",
    lastUpdated: 'June 2018',
    tags: ['Solidworks', 'mechanical design', 'animatronic', 'Foxing', 'music'],
};

const Page = (): JSX.Element => {
    return <h1>Foxing Animatronic</h1>
}

export default Page;
