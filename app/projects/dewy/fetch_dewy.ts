import { isDefined, try_or_undefined } from "@/app/utils"
import { PyModule } from "./dewy"

export const fetch_dewy_interpreter_source = async (): Promise<PyModule[]> => { 
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


export const fetch_dewy_examples = async (): Promise<string[]> => {
    const root = 'https://raw.githubusercontent.com/david-andrew/dewy-lang/master/'
    const readme_url = `${root}README.md`
    const readme_response = await fetch(readme_url)
    const readme = await readme_response.text()

    // find the lines that are part of the table of examples
    const readme_lines = readme.split('\n')
    const start = readme_lines.findIndex(line => line.includes('| Filename                                                        |  status  |'))
    const end = readme_lines.findIndex((line, i) => i > start && !line.startsWith('|'))
    const example_lines = readme_lines.slice(start, end)
    
    // map to a list of the filename, and the status
    const examples_paths = example_lines.map(try_or_undefined(
        line => {
            const [_, filename, status, __] = line.split('|').map(s => s.trim())
            return { filename, status }
        }
    ))
        // remove undefined rows
        .filter(isDefined)
        // select only examples that are marked successful
        .filter(example => example.status === "[✓]")
        // map to just the filepath. paths are markdown links of the form [some_name](path/to/file)
        .map(try_or_undefined(example => example.filename.split(']')[1].split('(')[1].split(')')[0]))
        // remove undefined rows
        .filter(isDefined)

    // collect the contents of each file
    const contents = examples_paths.map(async path => {
        const url = `${root}${path}`
        const response = await fetch(url)
        return await response.text()
    })

    return await Promise.all(contents)
}