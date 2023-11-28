"use client";
import { useEmscriptenWasm } from "@/app/(hooks)/wasm";
import { useEffect } from "react";

type TestWasm = {
  _add_fn: (a: number, b: number) => number;
  _test_fn: () => number;
};

const Page = (): JSX.Element => {
    const {wasmModule, error} = useEmscriptenWasm<TestWasm>('/wasm/test/test');
    useEffect(() => {
        if (!wasmModule || error) return;
        console.log('add_fn(1,2)', wasmModule._add_fn(1,2));
        console.log('test_fn()', wasmModule._test_fn());
    }, [wasmModule, error]);
    console.log(wasmModule, error);

    return (
        <div>
            <h1>WASM Test</h1>
        </div>
    )
}

export default Page;