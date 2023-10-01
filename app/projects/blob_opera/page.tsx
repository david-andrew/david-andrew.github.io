import { ProjectMeta } from "../types";
import blob_opera_nox from '../../(images)/projects/blob_opera_nox.png'

export const meta: ProjectMeta = {
    title: 'Blob Opera Performances',
    imgSrc: blob_opera_nox,
    internalLink: '/projects/blob_opera',
    summary: 'Virtual choir performances leveraging the blob opera as a front end for voice synthesis',
    lastUpdated: 'February 2021', //TODO->repo is private
    tags: ['Python', 'Blob Opera', 'choir', 'music', 'synthesis'],
};

const Page = (): JSX.Element => {
    return <h1>Blob Opera</h1>
}

export default Page;