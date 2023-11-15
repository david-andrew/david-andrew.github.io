import { Content } from './content'
import { getImages } from '@/app/projects/fetch'


const Page = async (): Promise<JSX.Element> => {
    const images = await getImages('escort_mission')

    return (
        <Content images={images} />
    )
}

export default Page;
