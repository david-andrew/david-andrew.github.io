'use client';
import { createContext, useContext, useState } from "react";
import { SortOption, sortOptionsList } from "./types";

const ProjectsContext = createContext<{sortOption:SortOption, setSortOption:(sortOption:SortOption)=>void}>({
    sortOption: sortOptionsList[0],
    setSortOption: (sortOption:SortOption) => {},
})

export const ProjectsContextProvider = ({ children }:{ children: React.ReactNode }) => {
    const [sortOption, setSortOption] = useState<SortOption>(sortOptionsList[0])

    return (
        <ProjectsContext.Provider value={{ sortOption, setSortOption }}>
            {children}
        </ProjectsContext.Provider>
    )
};

export const useProjectsContext = () => useContext(ProjectsContext);