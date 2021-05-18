//by making this a compiled ts file, we guarantee all pieces of content are present

//TODO->articles might want to be their own page
//TODO->summary might want to be a JSX.Element rather than a string... can wrap in <></> for just string

//imports for images used in the projects
import logo from '../../images/logo.png'
import logo_slim from '../../images/logo_slim.png'
import escort_mission from '../../images/escort_mission_lamb.png'
import dewy_dandelion from '../../images/dewy_dandelion.jpg'

export interface ProjectContent {
    title: string
    github?: string //name of the github repo to pull timestamp from
    lastUpdated?: string //raw timestamp string if not a github project
    imgSrc?: string //image to display on summary card
    summary: string //blurb for this card
    tags?: string[] //notable things related to this project
    internalLink?: string //link on the site to navigate to, e.g. /projects/dewy
    externalLink?: string //external link to navigate to for this card
}

export const projects: ProjectContent[] = [
    {
        title: 'Dewy Programming Language',
        github: 'dewy',
        imgSrc: dewy_dandelion,
        internalLink: '/projects/dewy',
        summary: `An engineering focused programming language I am developing. Leverages a custom SRNGLR parser written entierly in C, which allows for much flexibility in the langiage Context Free Grammar specification`,
        tags: ['C', 'compilers', 'parsers', 'SRNGLR'],
    },
    {
        title: 'Personal Website',
        github: 'website',
        imgSrc: logo,
        externalLink: 'https://github.com/david-andrew/website',
        summary: `This website, written in react/typescript`,
        tags: ['Typescript', 'React', 'Semantic UI', 'CSS', 'HTML'],
    },
    {
        title: 'Escort Mission 2020',
        github: 'escort_mission_2020',
        imgSrc: escort_mission,
        summary: `Submission for the 2020 GMTK Game Jam`,
        tags: ['Godot', 'GDScript', '2D Adventure Game'],
    },
    {
        title: 'Musical DL Voice Synthesizer',
        github: 'MusicalDL',
        imgSrc: logo,
        summary: `2019 Machine Learning: Deep Learning (EN.601.682) capstone project`,
        tags: ['Python', 'PyTorch', 'AI/ML', 'choral', 'music', 'synthesis'],
    },
    {
        title: 'Mechatronics Robot',
        imgSrc: logo,
        summary: `Robot from mechatronics`,
    },
    {
        title: 'Draw Robot',
        imgSrc: logo,
        summary: `UR5 robot arm project`,
    },
    {
        title: 'Boat Simulator',
        imgSrc: logo,
        summary: `HopHacks 20XX submission`,
    },
    {
        title: 'Rewind',
        imgSrc: logo,
        summary: `Fusce dictum dolor varius orci aliquet posuere. Donec interdum dui condimentum `,
    },
    {
        title: 'Ensemble (Hacking Harmony)',
        imgSrc: logo,
        summary: 'Fusce dictum dolor varius orci aliquet posuere. Donec interdum dui condimentum',
    },
    {
        title: 'Dewy Programming Language',
        github: 'dewy',
        imgSrc: dewy_dandelion,
        internalLink: '/projects/dewy',
        summary: `An engineering focused programming language I am developing. Leverages a custom SRNGLR parser written entierly in C, which allows for much flexibility in the langiage Context Free Grammar specification`,
        tags: ['C', 'compilers', 'parsers', 'SRNGLR'],
    },
    {
        title: 'Personal Website',
        github: 'website',
        imgSrc: logo,
        externalLink: 'https://github.com/david-andrew/website',
        summary: `This website, written in react/typescript`,
        tags: ['Typescript', 'React', 'Semantic UI', 'CSS', 'HTML'],
    },
    {
        title: 'Escort Mission 2020',
        github: 'escort_mission_2020',
        imgSrc: escort_mission,
        summary: `Submission for the 2020 GMTK Game Jam`,
        tags: ['Godot', 'GDScript', '2D Adventure Game'],
    },
    {
        title: 'Musical DL Voice Synthesizer',
        github: 'MusicalDL',
        imgSrc: logo,
        summary: `2019 Machine Learning: Deep Learning (EN.601.682) capstone project`,
        tags: ['Python', 'PyTorch', 'AI/ML', 'choral', 'music', 'synthesis'],
    },
    {
        title: 'Mechatronics Robot',
        imgSrc: logo,
        summary: `Robot from mechatronics`,
    },
    {
        title: 'Draw Robot',
        imgSrc: logo,
        summary: `UR5 robot arm project`,
    },
    {
        title: 'Boat Simulator',
        imgSrc: logo,
        summary: `HopHacks 20XX submission`,
    },
    {
        title: 'Rewind',
        imgSrc: logo,
        summary: `Fusce dictum dolor varius orci aliquet posuere. Donec interdum dui condimentum `,
    },
    {
        title: 'Ensemble (Hacking Harmony)',
        imgSrc: logo,
        summary: 'Fusce dictum dolor varius orci aliquet posuere. Donec interdum dui condimentum',
    },
]
