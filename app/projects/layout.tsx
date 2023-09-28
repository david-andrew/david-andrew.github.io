"use client"
import { Container } from "../(components)/ui"
import { NavbarDummy } from "../(components)/navbar"
import { Dropdown } from "../(components)/dropdown"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { SortOption, sortOptionsList } from "./sorttypes"

const ProjectsLayout = ({children}:{ children:React.ReactNode }): JSX.Element => {

    const path = usePathname()

    const [selectedSortOption, setSelectedSortOption] = useState<SortOption>(sortOptionsList[0])

    const router = useRouter()

    return (
        <Container>
            {path==='/projects' && <Dropdown
                text="Sort By"
                selected={selectedSortOption}
                options={sortOptionsList} 
                onClick={(selectedOption) => {
                    setSelectedSortOption(selectedOption);
                    router.push(`/projects?sort=${selectedOption}`)
                }}
            />}
            {children}
            <NavbarDummy />
        </Container>
    )
}

export default ProjectsLayout