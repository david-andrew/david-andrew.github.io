export const fetch_dewy_source = async (): Promise<string[]> => { 
    const urls = [
        'https://raw.githubusercontent.com/david-andrew/dewy-lang/master/src/compiler/backend.py',
        'https://raw.githubusercontent.com/david-andrew/dewy-lang/master/src/compiler/dewy.py',
        'https://raw.githubusercontent.com/david-andrew/dewy-lang/master/src/compiler/frontend.py',
        'https://raw.githubusercontent.com/david-andrew/dewy-lang/master/src/compiler/parser.py',
        'https://raw.githubusercontent.com/david-andrew/dewy-lang/master/src/compiler/postok.py',
        'https://raw.githubusercontent.com/david-andrew/dewy-lang/master/src/compiler/tokenizer.py',
        'https://raw.githubusercontent.com/david-andrew/dewy-lang/master/src/compiler/utils.py'
    ]


    const contents = urls.map(async url => {
        const response = await fetch(url)
        return await response.text()
    })

    return await Promise.all(contents)
}