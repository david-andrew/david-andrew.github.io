"use client"
import { useSearchParams } from "next/navigation"
import { projects, ProjectContent } from "./summaries";
import { NavbarDummy } from "../(components)/navbar";



const Container = ({children}:{children:React.ReactNode}) => {
    return (
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-[1048px]">
        {children}
      </div>
    );
  };




export default function Test() {
    const maxPage = 10; //TODO: get this from the projects pages

    const params = useSearchParams();

    // get the current page number from the url (or default to 1)
    let page: number = parseInt(params.get("page") ?? '');
    if (isNaN(page)) page = 1;
    if (page < 1) page = 1;
    if (page > maxPage) page = maxPage;
    
    return (
        <Container>
            {projects.map((project: ProjectContent) => (
                <div className="text-7xl" key={project.title}>{project.title}</div>
            ))}
            <NavbarDummy />
        </Container>
    )
}