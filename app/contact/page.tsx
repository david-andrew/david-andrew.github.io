import { IconBullet, IconBulletList } from "../(components)/icon_bullet";
import { NavbarDummy } from "../(components)/navbar";
import { Link } from "../(components)/ui";

const Page =() => {
    return (
        <>
            <div className="flex flex-col h-full">
                <div className="w-full flex flex-row items-center justify-center flex-grow">
                    <div className="outline outline-white py-16 px-10 md:py-20 md:px-10 lg:py-36 lg:px-20">
                        <IconBulletList>
                            <IconBullet responsive icon="envelope">
                                <Link className="text-md md:text-xl lg:text-3xl font-quadon align-middle whitespace-nowrap" href="mailto:david.andrew.engineer@gmail.com">
                                    david.andrew.engineer@gmail.com
                                </Link>
                            </IconBullet>
                            <IconBullet responsive icon="linkedin">
                                <Link className="text-md md:text-xl lg:text-3xl font-quadon align-middle whitespace-nowrap" href="https://www.linkedin.com/in/dewy" />
                            </IconBullet>
                        </IconBulletList>
                    </div>
                </div>
                <NavbarDummy/>
            </div>
        </>
    )
}

export default Page;