import Image, { StaticImageData } from "next/image"

export const Collage = ({ images, rowSizes }: {images:StaticImageData[], rowSizes:number[]}): JSX.Element => {
    //DEBUG simple list of images
    return (
        <>
            {images.map((image, index) => (
                <div key={index}>
                    <Image src={image} alt="image"/>
                </div>
            ))}
        </>
    )
}