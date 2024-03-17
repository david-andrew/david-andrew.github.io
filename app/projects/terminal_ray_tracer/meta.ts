import { ProjectMeta } from '../types'
import terminal_ray_tracer from '@/app/(images)/projects/terminal_ray_tracer.png'

export const meta: ProjectMeta = {
    title: 'Terminal Ray Tracer',
    imgSrc: terminal_ray_tracer,
    github: 'TerminalRayTracer',
    summary: 'A dependency-free ray tracer written in C that runs directly in a linux terminal',
    tags: ['C', 'ray tracing', 'CLI', 'linux'],
}
