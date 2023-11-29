"use client";
import { useEffect, useState, useCallback, useRef } from "react";

declare const Module: any;
type WasmModule = {
    cwrap: (name: string, returnType: string, argTypes: string[]) => any;
};

export const useEmscriptenWasm = (basePath: string, print?:(s:string)=>void) => {
    const [wasmModule, setWasmModule] = useState<WasmModule | undefined>(undefined);
    const [error, setError] = useState<Error | undefined>(undefined);

    let script: HTMLScriptElement | null = null;
    // let scriptRef = useRef<HTMLScriptElement | null>(null);

    const initializeWasmModule = useCallback(async () => {
        const scriptPath = `${basePath}.js`;
        const wasmPath = `${basePath}.wasm`;

        try {
            // Check if the .js and .wasm files exist
            const scriptResponse = await fetch(scriptPath);
            const wasmResponse = await fetch(wasmPath);
            if (!scriptResponse.ok || !wasmResponse.ok) {
                throw new Error(`Failed to find script or WASM file at ${basePath}`);
            }

            // Create and append script element
            script = document.createElement('script');
            script.src = scriptPath;
            script.async = true;
            script.onload = () => {
                Module({
                    onRuntimeInitialized: () => {
                        console.log("onRuntimeInitialized");
                    },
                    print: print ?? console.log,
                }).then((module: WasmModule) => {
                    setWasmModule(module);
                });
            };
            document.body.appendChild(script);
        } catch (err) {
            setError(err as Error);
        }
    }, [basePath, print]);

    const reloadWasmModule = useCallback(() => {
        // Reset the state and remove existing script
        setWasmModule(undefined);
        if (script) {
            document.body.removeChild(script);
        }

        // Reinitialize the module
        initializeWasmModule();
    }, [initializeWasmModule]);

    useEffect(() => {
        initializeWasmModule();

        return () => {
            // Cleanup script on unmount
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, [initializeWasmModule, script]);

    return { wasm:wasmModule, error, reload:reloadWasmModule };
};

export default useEmscriptenWasm;