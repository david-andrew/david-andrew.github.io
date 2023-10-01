
import { ProjectMeta } from "../types";
import wse18 from '../../(images)/projects/wse18.png'

export const meta: ProjectMeta = {
    title: 'WSE18: Machine Shop Biometric Interlock',
    imgSrc: wse18,
    internalLink: '/projects/wse18',
    summary: 'Biometric security interlock system. Mechanical Engineering Senior Design capstone project',
    lastUpdated: 'May 2018',
    tags: ['Raspberry Pi', 'Python', 'C++', 'Qt', 'interlock', 'fingerprint', 'biometric'],
};

const Page = (): JSX.Element => {
    return <h1>WSE18: Machine Shop Biometric Interlock</h1>
}

export default Page;
