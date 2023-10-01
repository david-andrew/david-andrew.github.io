# How to Add a New Project
1. Create a new folder in the `projects` directory. The folder name will be the url slug for the project. e.g. `projects/my-new-project`
1. add a `page.tsx` file which has a default export of JSX.Element. This will be the page content.
1. add a `meta.ts` with an exported const variable for project metadata. This will be used to generate the project card on the projects list page

Example project stub for `projects/dewy`:

```tsx
// Path: app/projects/dewy/page.tsx
const Page = (): JSX.Element => {
    return <>{/*your page goes here*/}</>
}

export default Page;
```

```ts
// Path: app/projects/dewy/meta.ts
import { ProjectMeta } from "../types";
import dewy_dandelion from '../../(images)/projects/dewy_dandelion.jpg'

export const meta: ProjectMeta = {
    title: 'Dewy Programming Language',
    github: 'dewy',
    imgSrc: dewy_dandelion,
    summary: `An engineering focused programming language I am developing. Leverages a custom SRNGLR parser written entierly in C`,
    tags: ['C', 'compilers', 'parsers', 'SRNGLR', 'LLVM'],
};
```



Notes:
- the title+timestamp is automatically placed at the top of the page, so it only needs to be specified in `meta.ts`
- `page.tsx` is only allowed to have a single export, being the page JSX.Element, hence why meta is in a separate file
- `ProjectMeta` type should help fill out the correct types for the project metadata 
- `imgSrc` is used as the picture on the project card
- `github` will be used to fetch the most recent commit date (currently for the primary branch). could replace github with `lastUpdated` if I want to manually set the date as a string
- an `externalLink` means the card will link to arbitrary external sites. If an externalLink is provided, the page will still technically be accessible via the url (TODO: look into automatically redirecting to the external link)
