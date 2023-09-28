"use client"
import { Container } from "../(components)/ui"
import { NavbarDummy } from "../(components)/navbar"
import { Dropdown } from "../(components)/dropdown"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"

export const sortOptionsList = ['Recommended', 'Date (New-Old)', 'Date (Old-New)', 'Alphabetical (A-Z)', 'Alphabetical (Z-A)'] as const;
export type SortOption = typeof sortOptionsList[number];
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
                    router.push(`/projects?sort=${sortOptionsList.indexOf(selectedOption)}`)
                }}
            />}
            {children}
            <NavbarDummy />
        </Container>
    )
}

export default ProjectsLayout