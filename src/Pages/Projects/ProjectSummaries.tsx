import logo from '../../images/logo.png'
// import logo_slim from '../../images/logo_slim.png'
import escort_mission from '../../images/escort_mission_lamb.png'
import dewy_dandelion from '../../images/dewy_dandelion.jpg'
import boat_simulator from '../../images/boat_simulator.jpg'
import rewind_title from '../../images/rewind_title.png'
import blob_opera_nox from '../../images/blob_opera_nox.png'
import prs2019_preview from '../../images/prs2019_preview.png'

//by making this a compiled ts file, we guarantee all pieces of content are present when building

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
        tags: ['C', 'compilers', 'parsers', 'SRNGLR', 'LLVM'],
    },
    {
        title: 'Personal Website (Github Link)',
        github: 'website',
        imgSrc: logo,
        externalLink: 'https://github.com/david-andrew/website',
        summary: `This website, written in react/typescript`,
        tags: ['React', 'TypeScript', 'Semantic UI', 'CSS', 'HTML'],
    },
    {
        title: 'Escort Mission 2020',
        github: 'escort_mission_2020',
        imgSrc: escort_mission,
        internalLink: '/projects/escort_mission',
        summary: `Submission for the 2020 GMTK Game Jam`,
        tags: ['Godot', 'GDScript', '2D game'],
    },
    {
        title: 'Ensemble',
        imgSrc: logo,
        internalLink: '/projects/ensemble',
        summary: 'Choral music synthesis with deep learning (Continuation of Musical DL)',
        tags: ['Python', 'Pytorch', 'AI/ML', 'choral', 'music', 'synthesis'],
    },
    {
        title: 'Musical DL Voice Synthesizer',
        github: 'MusicalDL',
        imgSrc: logo,
        internalLink: '/projects/musical_dl',
        summary: `2019 Machine Learning: Deep Learning (EN.601.682) capstone project`,
        tags: ['Python', 'PyTorch', 'AI/ML', 'choral', 'music', 'synthesis'],
    },
    {
        title: 'Ensemble (Hacking Harmony)',
        imgSrc: logo,
        internalLink: '/projects/ensemble_peabody',
        summary: '2019 Peabody Hackathon Submission. Autotunes google text-to-speech to produce music synthesis',
        tags: ['Google text-to-speech API', 'matlab(python?)'],
    },
    {
        title: 'Boat Simulator',
        imgSrc: boat_simulator,
        internalLink: '/projects/boat_simulator',
        summary: `HopHacks 20XX submission`,
        tags: ['Unity', 'C#', '3D game'],
    },
    {
        title: 'Mechatronics Robots',
        imgSrc: logo,
        internalLink: '/projects/mechatronics',
        summary: `Robots from mechatronics`,
        tags: ['Arduino', 'C++', 'SolidWorks', 'mechanical design'],
    },
    {
        title: 'PRS19',
        github: 'PRS_robot',
        imgSrc: prs2019_preview,
        internalLink: '/projects/prs19',
        summary: "Automatic guitar fret presser robot. Mechanical Engineering Master's Design captsone project",
        tags: ['C++', 'Arduino', 'mechanical design'],
    },
    {
        title: 'WSE18',
        imgSrc: logo,
        internalLink: '/projects/wse18',
        summary: 'Machine shop biometric interlock system. Mechanical Engineering Senior Design capstone project',
        tags: ['Raspberry Pi', 'Python', 'C++', 'Qt', 'interlock', 'fingerprint', 'biometric'],
    },
    {
        title: 'Draw Robot',
        imgSrc: logo,
        internalLink: '/projects/drawbot',
        summary: `UR5 robot arm project`,
        tags: ['Matlab', 'UR5 robot', 'ROS'],
    },
    {
        title: 'Rewind',
        imgSrc: rewind_title,
        internalLink: '/projects/rewind',
        summary: '2019 Video Game Desgn (EN.601.355) capstone project',
        tags: ['Unity', 'C#', '2D game'],
    },
    {
        title: 'uSkipSpoilers (Github Link?)',
        imgSrc: logo,
        // externalLink: 'https://github.com/david-andrew/uSkipSpoilers',
        internalLink: '/projects/uskipspoilers',
        summary: 'A small chrome extension for blocking spoilers in YouTube videos',
        tags: ['React', 'TypeScript', 'Chrome', 'Extension'],
        github: 'uSkipSpoilers',
    },
    {
        title: 'Composer',
        imgSrc: logo,
        internalLink: '/projects/composer',
        summary: 'React based composing software that acts as a front-end interface for LilyPond',
        lastUpdated: 'January 3, 2021', //TODO->Repo is private
        tags: ['React', 'TypeScript', 'SMuFL', 'LilyPond', 'music', 'composition'],
    },
    {
        title: 'Blob Opera Performances',
        imgSrc: blob_opera_nox,
        internalLink: '/projects/blob_opera',
        summary: 'Virtual choir performances leveraging the blob opera as a front end for voice synthesis',
        lastUpdated: 'February 10, 2021', //TODO->repo is private
        tags: ['Python', 'Blob Opera', 'choir', 'music', 'synthesis'],
    },
    {
        title: 'Lords of Sola',
        imgSrc: logo,
        internalLink: '/projects/lords_of_sola',
        summary: 'Concept for a Real-Time-Strategy crossed with First-Person-Shooter',
        lastUpdated: 'January 8, 2021', //TODO->repo is private
        tags: ['Godot', 'GDScript', 'FPS x RTS', '3D game'],
    },
    {
        title: 'Mehve',
        imgSrc: logo,
        internalLink: '/projects/mehve',
        summary: '3D adventure game inspire by "Nausicaa of the Valley of the Wind"',
        github: 'mehve',
        tags: ['Godot', 'GDScript', '3D game'],
    },
]