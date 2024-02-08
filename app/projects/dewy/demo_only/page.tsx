import { DewyDemo } from '../dewy'
import { fetch_dewy_interpreter_source, fetch_dewy_examples } from '../fetch_dewy'

const Page = async (): Promise<JSX.Element> => {
    const dewy_interpreter_source = await fetch_dewy_interpreter_source()
    const dewy_examples = await fetch_dewy_examples()
    return (
        <div className="w-screen h-screen absolute top-0 left-0 z-50 bg-black overflow-y-scroll">
            <div className="p-2">
                <DewyDemo {...{ dewy_interpreter_source, dewy_examples }} />
            </div>
        </div>
    )
}

export default Page
