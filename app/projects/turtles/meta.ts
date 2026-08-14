import { ProjectMeta } from '../types'
import pypi_logo from '@/app/(images)/icons/pypi_logo.svg'

export const meta: ProjectMeta = {
    title: 'Turtles',
    github: 'turtles',
    imgSrc: pypi_logo,
    summary: 'A small Python DSL for writing parsers that feel like dataclasses',
    tags: ['Python', 'PyPI', 'parsers', 'regex'],
}
