"use client"
import { FetchedProjectMeta } from "./types";
import { usePathname } from "next/navigation";
import { H1, P } from "@/app/(components)/ui";

export const Heading = ({projects}:{projects:FetchedProjectMeta[]}): JSX.Element => {
    const pathname = usePathname();
    const project = projects.find(project => `/projects/${project.route}` === pathname);
    if (project === undefined) return <></>;

    return (
        <>
            <H1 className="mb-0">{project.title}</H1>
            <P>
                {project.timestamp === undefined ? 
                    'Unknown' : 
                    project.timestamp.toLocaleDateString('en-US', {year: 'numeric', month: 'long'})
                }
            </P>
        </>
    );
}