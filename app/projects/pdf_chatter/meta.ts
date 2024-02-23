import { ProjectMeta } from '../types'
import logo from '@/app/(images)/logo.png' //TODO: probably use openai logo

export const meta: ProjectMeta = {
    title: 'PDF Chatter',
    imgSrc: logo,
    summary: 'LLM powered Q&A over extracted PDF text',
    github: 'pdf-chatter',
    tags: ['Python', 'Optical Character Recognition (OCR)', 'Large Language Models (LLMs)'],
}
