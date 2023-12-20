import { PyModule } from "./dewy"

export const fetch_dewy_source = async (): Promise<PyModule[]> => { 
    const root = 'https://raw.githubusercontent.com/david-andrew/dewy-lang/master/src/compiler/'
    const files = [
        'backend',
        'dewy',
        'frontend',
        'parser',
        'postok',
        'tokenizer',
        'utils'
    ]

    const contents = files.map(async file => {
        const url = `${root}${file}.py`
        const response = await fetch(url)
        return { 
            name: file,            
            code: await response.text()
        }
    })

    return await Promise.all(contents)
}