import { ProjectMeta } from "../(old)summaries";
import dewy_dandelion from '../../(images)/projects/dewy_dandelion.jpg'

export const meta: ProjectMeta = {
    title: 'Dewy Programming Language',
    github: 'dewy',
    imgSrc: dewy_dandelion,
    internalLink: '/projects/dewy',
    summary: `An engineering focused programming language I am developing. Leverages a custom SRNGLR parser written entierly in C`,
    tags: ['C', 'compilers', 'parsers', 'SRNGLR', 'LLVM'],
};

const Page = (): JSX.Element => {
    return <h1>Dewy</h1>
}

export default Page;