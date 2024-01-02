import { isDefined, try_or_undefined } from '@/app/utils'
import { PyModule } from '@/app/(hooks)/pyodide'

export const fetch_dewy_interpreter_source = async (): Promise<PyModule[]> => {
    const root = 'https://raw.githubusercontent.com/david-andrew/dewy-lang/master/src/compiler/'
    const files = ['backend', 'dewy', 'frontend', 'parser', 'postok', 'tokenizer', 'utils']

    const contents = files.map(async (file) => {
        const url = `${root}${file}.py`
        const response = await fetch(url)
        return {
            name: file,
            code: await response.text(),
        }
    })

    return await Promise.all(contents)
}

export type DewySource = {
    name: string
    code: string
}

export type FetchedDewySourceExamples = {
    good_examples: DewySource[]
    bad_examples: DewySource[]
}

export const fetch_dewy_examples = async (): Promise<FetchedDewySourceExamples> => {
    const root = 'https://raw.githubusercontent.com/david-andrew/dewy-lang/master/'
    const readme_url = `${root}README.md`
    const readme_response = await fetch(readme_url)
    const readme = await readme_response.text()

    // find the lines that are part of the table of examples
    const readme_lines = readme.split('\n')
    const start = readme_lines.findIndex((line) =>
        line.includes('| Filename                                                        |  status  |'),
    )
    const end = readme_lines.findIndex((line, i) => i > start && !line.startsWith('|'))
    const example_lines = readme_lines.slice(start, end)

    type RawFileAndStatus = { link: string; status: string }

    // map to a list of the markdown links, and the status
    const { good_rows, bad_rows } = example_lines
        // collect rows in the table that have content (markdown link + status)
        .map(
            try_or_undefined((line): RawFileAndStatus => {
                const [_, link, status, __] = line.split('|').map((s) => s.trim())
                return { link, status }
            }),
        )
        // remove undefined rows
        .filter(isDefined)
        //partition successful vs broken examples
        .reduce(
            (acc, example) => {
                if (example.status === '[✓]') {
                    acc.good_rows.push(example.link)
                } else if (example.status === '[✗]') {
                    acc.bad_rows.push(example.link)
                }
                return acc
            },
            { good_rows: [] as string[], bad_rows: [] as string[] },
        )

    // grab the actual filename and path
    type FileAndPath = { name: string; path: string }
    const convertMarkdownLink = try_or_undefined((link: string): FileAndPath => {
        return {
            name: link.split(']')[0].split('[')[1],
            path: link.split(']')[1].split('(')[1].split(')')[0],
        }
    })
    const fetchContents = async ({ name, path }: FileAndPath) => {
        const url = `${root}${path}`
        const response = await fetch(url)
        return { name, code: await response.text() }
    }

    const good_examples = good_rows.map(convertMarkdownLink).filter(isDefined).map(fetchContents)
    const bad_examples = bad_rows.map(convertMarkdownLink).filter(isDefined).map(fetchContents)

    return {
        good_examples: await Promise.all(good_examples),
        bad_examples: await Promise.all(bad_examples),
    }
}
