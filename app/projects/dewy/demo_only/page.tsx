import { DewyDemo } from '../dewy'
import { fetch_dewy_interpreter_source } from '../fetch_dewy'

const Page = async (): Promise<JSX.Element> => {
    const dewy_interpreter_source = await fetch_dewy_interpreter_source()
    return (
        <div className="w-screen h-screen absolute top-0 left-0 z-50 bg-black overflow-y-scroll">
            <div className="p-2">
                <DewyDemo {...{ dewy_interpreter_source }} />
            </div>
        </div>
    )
}

export default Page
