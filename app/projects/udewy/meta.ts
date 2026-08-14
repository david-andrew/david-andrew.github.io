import { ProjectMeta } from '../types'
import udewy_logo from '@/app/(images)/projects/udewy_logo.png'

export const meta: ProjectMeta = {
    title: 'μDewy',
    github: { repo: 'dewy-lang', path: 'udewy' },
    imgSrc: udewy_logo,
    summary: 'A bootstrapping subset of Dewy, simple enough to implement in assembly and expressive enough to write a real compiler',
    tags: ['Programming Languages', 'compilers', 'WebAssembly', 'x86_64', 'RISC-V'],
}
