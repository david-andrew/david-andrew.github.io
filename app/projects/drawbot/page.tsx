import { getImages } from '@/app/projects/fetch'
import { Content } from './client'

const Page = async (): Promise<JSX.Element> => {
    const images = await getImages('drawbot/end_effector')
    return <Content images={images} />
}

export default Page;
