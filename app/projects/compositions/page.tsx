import { ProjectMeta } from "../projects";
import music_staff from '../../(images)/projects/music_staff.png'

export const meta: ProjectMeta = {
    title: 'Choir Compositions',
    imgSrc: music_staff,
    internalLink: '/projects/compositions',
    summary: '',
    lastUpdated: 'May 2015',
    tags: ['music', 'choral', 'composition'],
};

const Page = (): JSX.Element => {
    return <h1>Compositions</h1>
}

export default Page;