import { Collage } from "@/app/(components)/collage"
import { Container } from "@/app/(components)/ui"
import { getImages } from "@/app/projects/fetch"

const Page = async (): Promise<JSX.Element> => {
    const images = await getImages('clovers')
    return (
        <Container>
            <Collage images={images} rowSizes={[3,4,5]} reflowable />
        </Container>
    )
}

export default Page