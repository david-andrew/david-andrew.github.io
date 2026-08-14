import { ProjectMeta } from '../types'
import pypi_logo from '@/app/(images)/icons/pypi_logo.svg'

export const meta: ProjectMeta = {
    title: 'Toki',
    github: { owner: 'jataware', repo: 'toki' },
    imgSrc: pypi_logo,
    summary: 'Minimal universal Python API for building LLM agents across multiple providers',
    tags: ['Python', 'PyPI', 'Large Language Models (LLMs)', 'agents'],
}
