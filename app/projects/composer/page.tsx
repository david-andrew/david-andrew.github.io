import { ProjectMeta } from "../projects";
import ye_arlington_musicke_lab_logo from '../../(images)/projects/YeArlingtonMusickeLabLogo.png'

export const meta: ProjectMeta = {
    title: 'Composer',
    imgSrc: ye_arlington_musicke_lab_logo,
    internalLink: '/projects/composer',
    summary: 'React based composing software that acts as a front-end for LilyPond',
    lastUpdated: 'January 2021', //TODO->Repo is private
    tags: ['React', 'TypeScript', 'SMuFL', 'LilyPond', 'music', 'composition'],
};

const Page = (): JSX.Element => {
    return <h1>Composer</h1>
}

export default Page;