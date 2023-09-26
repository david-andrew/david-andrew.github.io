import Image, { StaticImageData } from 'next/image'
import Link from 'next/link';
import { getProjects, ProjectMeta } from "./projects";
import { NavbarDummy } from "../(components)/navbar";
import { Container } from "../(components)/ui";

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



export const Projects = async (): Promise<JSX.Element> => {
// export const Projects = (): JSX.Element => {
    // const router = useRouter();
    const projects = await getProjects();
    return (
        <Container>
            <div className="flex flex-col gap-2">
                {projects.map(({name:route, content:project}) => (
                    <Link href={`/projects/${route}`}>
                        <Card
                            key={project.title}
                            imgSrc={project.imgSrc}
                            title={project.title}
                            lastUpdated={project.lastUpdated ?? 'unknown'}
                            description={project.summary}
                            tags={project.tags ?? []}
                        />
                    </Link>
                    ))}
            </div>
            <NavbarDummy />
        </Container>
    )
}

export default Projects;