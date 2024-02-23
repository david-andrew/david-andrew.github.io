import { ProjectMeta } from '../types'
import pypi_logo from '@/app/(images)/icons/pypi_logo.svg' //TODO: probably use openai logo

export const meta: ProjectMeta = {
    title: 'PDF Chatter',
    imgSrc: pypi_logo,
    summary: 'LLM powered Q&A over extracted PDF text',
    github: 'pdf-chatter',
    tags: ['Python', 'Optical Character Recognition (OCR)', 'Large Language Models (LLMs)', 'Nougat-OCR', 'GPT-4'],
}
