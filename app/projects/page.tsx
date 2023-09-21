"use client"
import { useSearchParams } from "next/navigation"

export default function Test() {
    const maxPage = 10; //TODO: get this from the projects pages

    const params = useSearchParams();

    // get the current page number from the url (or default to 1)
    let page: number = parseInt(params.get("page") ?? '');
    if (isNaN(page)) page = 1;
    if (page < 1) page = 1;
    if (page > maxPage) page = maxPage;
    
    return (
        <div>
            <h1>Projects Page</h1>
            <h2>Page: {page}</h2>
        </div>
    )
}