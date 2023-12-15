"use client"
import { FetchedProjectMeta } from "./types";
import { usePathname } from "next/navigation";
import { H1, P } from "@/app/(components)/ui";
import { useGithubTimestampsContext } from "./context";

export const Heading = ({projects}:{projects:FetchedProjectMeta[]}): JSX.Element => {
    const timestampContext = useGithubTimestampsContext();
    const pathname = usePathname();
    const project = projects.find(project => `/projects/${project.route}` === pathname);
    if (project === undefined) return <></>;

    const timestamps = timestampContext?.timestamps ?? new Map();
    const timestamp = timestamps.get(project.route);

    return (
        <>
            <H1 className="mb-0">{project.title}</H1>
            <P>
                {timestamp === undefined ? 
                    'Unknown' : 
                    timestamp.toLocaleDateString('en-US', {year: 'numeric', month: 'long'})
                }
            </P>
        </>
    );
}