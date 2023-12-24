//stub file for making it more convenient to import the dewy demo
import dynamic from 'next/dynamic'
export const DewyDemo = dynamic(() => import('./_dewy'), { ssr: false })
