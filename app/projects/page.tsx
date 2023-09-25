"use client"
// import { useSearchParams } from "next/navigation"
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation';
import { projects, ProjectContent } from "./summaries";
import { NavbarDummy } from "../(components)/navbar";


// TODO: move to components/utilities
const Container = ({children}:{children:React.ReactNode}) => {
    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1048px]">
          {children}
        </div>
    );
};

type CardProps = {
    imgSrc: StaticImageData;
    title: string;
    lastUpdated: string;
    description: string;
    tags: string[];
    onClick?: () => void;
};

const Card = ({ imgSrc, title, lastUpdated, description, tags, onClick }: CardProps) => {
    return (
        <div 
            className="
                flex flex-col md:flex-row items-center md:space-x-6 p-4 
                border-solid border-black hover:border-white border-2
                cursor-pointer select-none
                "
            onClick={onClick}
        >
            {/* Image */}
            <Image src={imgSrc} alt={title} className="w-1/2 md:w-1/6 object-cover mb-4 md:mb-0" draggable={false}/>
    
            {/* Content */}
            <div className="w-full md:w-3/4">
            <h2 className="text-2xl font-quadon">{title}</h2>
            <p className="text-lg text-gray-500 mb-1 font-gentona">Last Updated: {lastUpdated}</p>
            <p className="text-lg mb-1 font-gentona">{description}</p>
            <p className="text-md text-gray-400 font-gentona">Tags: {tags.join(', ')}</p>
            </div>
        </div>
    );
};



export default function Test() {
    // const maxPage = 10; //TODO: get this from the projects pages

    // const params = useSearchParams();

    // // get the current page number from the url (or default to 1)
    // let page: number = parseInt(params.get("page") ?? '');
    // if (isNaN(page)) page = 1;
    // if (page < 1) page = 1;
    // if (page > maxPage) page = maxPage;

    const router = useRouter();
    
    return (
        <Container>
            <div className="flex flex-col gap-2">
                {projects.map((project: ProjectContent) => (
                    <Card
                        key={project.title}
                        imgSrc={project.imgSrc}
                        title={project.title}
                        lastUpdated={project.lastUpdated ?? 'unknown'}
                        description={project.summary}
                        tags={project.tags ?? []}
                        onClick={() => {
                            if (project.internalLink) {
                                router.push(project.internalLink);
                            } else if (project.externalLink) {
                                window.open(project.externalLink, '_blank');
                            }
                        }}
                    />
                    ))}
            </div>
            <NavbarDummy />
        </Container>
    )
}