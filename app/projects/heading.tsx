"use client"
import { FetchedProjectMeta } from "./types";
import { usePathname } from "next/navigation";

export const Heading = ({projects}:{projects:FetchedProjectMeta[]}): JSX.Element => {
    const pathname = usePathname();
    const project = projects.find(project => `/projects/${project.route}` === pathname);
    if (project === undefined) return <></>;

    return (
        <>
            <h1 className="pt-8 text-4xl font-quadon">{project.title}</h1>
            <p>
                {project.timestamp === undefined ? 
                    'Unknown' : 
                    project.timestamp.toLocaleDateString('en-US', {year: 'numeric', month: 'long'})
                }
            </p>
            <br/>
        </>
    );
}