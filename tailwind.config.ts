import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundColor: {
                accent: 'var(--accent-color)',
            },
            textColor: {
                accent: 'var(--accent-color)',
            },
            fill: {
                accent: 'var(--accent-color)',
            },
            fontFamily: {
                //TODO: bold/italic/etc variants
                quadon: ['Quadon'],
                arnhem: ['Arnhem'],
                gentona: ['Gentona'],
                dejavu: ['DejaVu'],
                'fira-code': ['Fira Code'],
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
}
export default config
