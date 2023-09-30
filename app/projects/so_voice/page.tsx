import { ProjectMeta } from "../types";
import ye_arlington_musicke_lab_logo from '../../(images)/projects/YeArlingtonMusickeLabLogo.png'


export const meta: ProjectMeta ={
    title: 'so voice!',
    imgSrc: ye_arlington_musicke_lab_logo,
    lastUpdated: 'December 2022',
    internalLink: '/projects/so_voice',
    summary: 'Choral music synthesis with deep learning (Continuation of Musical DL)',
    tags: ['Python', 'Pytorch', 'AI/ML', 'choral', 'music', 'synthesis'],
}

const Page = (): JSX.Element => {
    return <h1>So Voice!</h1>
}

export default Page;
