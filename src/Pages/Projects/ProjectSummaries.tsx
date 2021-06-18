import logo from '../../images/logo.png'
import escort_mission from '../../images/projects/escort_mission_lamb.png'
import dewy_dandelion from '../../images/projects/dewy_dandelion.jpg'
import boat_simulator from '../../images/projects/boat_simulator.jpg'
import rewind_title from '../../images/projects/rewind_title.png'
import blob_opera_nox from '../../images/projects/blob_opera_nox.png'
import prs2019_preview from '../../images/projects/prs2019_preview.png'
import foxing_animatronic from '../../images/projects/foxing_animatronic.png'
import rebel_scum from '../../images/projects/rebel_scum.jpg'
import music_staff from '../../images/projects/music_staff.png'
import ye_arlington_musicke_lab_logo from '../../images/projects/YeArlingtonMusickeLabLogo.png'

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
        summary: `An engineering focused programming language I am developing. Leverages a custom SRNGLR parser written entierly in C`,
        tags: ['C', 'compilers', 'parsers', 'SRNGLR', 'LLVM'],
    },
    {
        title: 'Personal Website (Github Link)',
        github: 'david-andrew.github.io',
        imgSrc: logo,
        externalLink: 'https://github.com/david-andrew/david-andrew.github.io',
        summary: `This website, written in react/typescript`,
        tags: ['React', 'TypeScript', 'WebAssembly', 'Semantic UI', 'CSS', 'HTML'],
    },
    {
        title: 'so voice!',
        imgSrc: ye_arlington_musicke_lab_logo,
        lastUpdated: 'January 18, 2021',
        internalLink: '/projects/so_voice',
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
        github: 'Ensemble',
        internalLink: '/projects/ensemble_peabody',
        summary: '2019 Peabody Hackathon Submission. Choral music synthesis via autotuned google text-to-speech, AKA the demon chipmunk choir',
        tags: ['Google text-to-speech API', 'matlab', 'python'],
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
        title: 'Composer',
        imgSrc: ye_arlington_musicke_lab_logo,
        internalLink: '/projects/composer',
        summary: 'React based composing software that acts as a front-end for LilyPond',
        lastUpdated: 'January 3, 2021', //TODO->Repo is private
        tags: ['React', 'TypeScript', 'SMuFL', 'LilyPond', 'music', 'composition'],
    },
    {
        title: 'Choir Compositions',
        imgSrc: music_staff,
        internalLink: '/projects/compositions',
        summary: '',
        lastUpdated: 'May 3, 2015',
        tags: ['music', 'choral', 'composition'],
    },
    {
        title: 'Foxing Animatronic',
        imgSrc: foxing_animatronic,
        internalLink: '/projects/foxing_animatronic',
        summary: "Manually actuated animatronic robot featured in the Foxing music video 'Slapstick'",
        lastUpdated: 'June 18, 2018',
        tags: ['Solidworks', 'mechanical design', 'animatronic', 'Foxing', 'music'],
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
        title: 'pOngBot',
        imgSrc: logo,
        internalLink: '/projects/pongbot',
        summary: 'Autonomous robot for shooting ping pong balls into cups',
        tags: ['Arduino', 'C++', 'computer vision', 'Viola-Jones', 'mechanical design'],
    },
    {
        title: 'RoboJay',
        imgSrc: logo,
        summary: 'A balancing robot designed to give campus tours to incoming JHU freshmen',
        internalLink: '/projects/robojay',
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
        title: 'Rewind',
        imgSrc: rewind_title,
        internalLink: '/projects/rewind',
        summary: '2019 Video Game Desgn (EN.601.355) capstone project',
        tags: ['Unity', 'C#', '2D game'],
    },
    {
        title: 'Boat Simulator',
        imgSrc: boat_simulator,
        lastUpdated: 'March 5, 2017',
        internalLink: '/projects/boat_simulator',
        summary: `Spring 2017 HopHacks submission`,
        tags: ['Unity', 'C#', '3D game'],
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
    {
        title: 'Rebel Scum Rocket',
        imgSrc: rebel_scum,
        internalLink: '/projects/rebel_scum',
        summary: 'Level 1 & 2 High Powered Rocket built with the Johns Hopkins Rocketry Club',
        tags: ['High Power Rocketry', 'Arduino', 'C++', 'mechanical design', 'Tripoli'],
        lastUpdated: 'January 17, 2018',
    },
    {
        title: '2018 Spaceport America Cup',
        imgSrc: logo,
        summary: 'Level 3 High Power Rocket build by the Astrojays (JHU rocketry team) for the Spaceport America Cup',
        internalLink: '/projects/spaceport_america_cup',
    },
    {
        title: 'uSkipSpoilers',
        imgSrc: logo,
        internalLink: '/projects/uskipspoilers',
        summary: 'A small chrome extension for blocking spoilers in YouTube videos',
        tags: ['React', 'TypeScript', 'Chrome', 'Extension'],
        github: 'uSkipSpoilers',
    },
    {
        title: 'Bueller Board',
        imgSrc: logo,
        lastUpdated: 'September 13, 2015',
        internalLink: '/projects/bueller_board',
        summary: "Fall 2016 HopHacks submission: Midi keyboard that used user provided audio samples, a.k.a. the 'goat keyboard'",
        tags: ['midi', 'music'],
    },
    // { //don't include until can find good photos/videos
    //     title: 'Sea Perch ROV',
    //     imgSrc: logo,
    //     internalLink: '/projects/sea_perch',
    //     summary: 'Underwater Remote Operated Vehicle...',
    // },
]
