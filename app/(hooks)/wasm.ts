"use client";
import { useEffect, useState } from "react";

declare const Module: any;

export const useEmscriptenWasm = <T,>(basePath: string) => {
  const [wasmModule, setWasmModule] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  useEffect(() => {
    const checkFilesExist = async () => {
      const scriptPath = `${basePath}.js`;
      const wasmPath = `${basePath}.wasm`;

      try {
        // Check if the .js file exists
        const scriptResponse = await fetch(scriptPath);
        if (!scriptResponse.ok) {
          throw new Error(`Failed to find script file at ${scriptPath}`);
        }

        // Check if the .wasm file exists
        const wasmResponse = await fetch(wasmPath);
        if (!wasmResponse.ok) {
          throw new Error(`Failed to find WASM file at ${wasmPath}`);
        }

        // Both files exist, proceed to load the script
        let script: HTMLScriptElement | undefined = document.createElement('script');
        script.src = scriptPath;
        script.async = true;

        script.onload = () => {
          Module().then((module: T) => {
            setWasmModule(module);
          });
        };

        document.body.appendChild(script);

        return () => {
          if (script) {
            document.body.removeChild(script);
            script = undefined;
          }
        };
      } catch (err) {
        setError(err as Error);
      }
    };

    checkFilesExist();
  }, [basePath]);

  return { wasmModule, error };
};

export default useEmscriptenWasm;
