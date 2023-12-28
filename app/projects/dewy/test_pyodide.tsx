import dynamic from 'next/dynamic'
export const MyComponent = dynamic(() => import('./_test_pyodide'), { ssr: false })
