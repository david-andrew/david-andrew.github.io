import { DewyDemo } from '../dewy'
import { fetch_dewy_interpreter_source } from '../fetch_dewy'

const Page = async (): Promise<JSX.Element> => {
    const dewy_interpreter_source = await fetch_dewy_interpreter_source()

    //TODO: check url parameter for initial code to give to demo

    return (
        <div className="w-screen h-screen absolute top-0 left-0 z-50 bg-black overflow-y-scroll">
            <div className="p-2">
                <DewyDemo dewy_interpreter_source={dewy_interpreter_source} initial_code='printl"Hello, World!"' />
            </div>
        </div>
    )
}

export default Page
