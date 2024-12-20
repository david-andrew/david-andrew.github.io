# git clone git@github.com:david-andrew/dewy-lang.git
# cd dewy-lang
# git checkout 188da93
# cd src/compiler
# cp ../../public/wasm/dewy_old/dewy_parser_wrapper.h .
# cp ../../public/wasm/dewy_old/dewy_parser_wrapper.c .
# emcc dewy_parser_wrapper.c charset.c fset.c gss.c metaitem.c metascanner.c object.c reduction.c set.c sppf.c tuple.c ustring.c vector.c dictionary.c gotokey.c metaast.c metaparser.c metatoken.c parray.c slice.c srnglr.c utilities.c -o dewy_parser_wrapper.js -s EXPORTED_FUNCTIONS='["_dewy_parser"]' -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]' -s MODULARIZE=1 -s EXPORT_NAME='Module' -s ENVIRONMENT='web' -s ASSERTIONS=1 -s EXIT_RUNTIME=1 -O3
# cp dewy_parser_wrapper.js ../../public/wasm/dewy_old/
# cp dewy_parser_wrapper.wasm ../../public/wasm/dewy_old/
# cd ../..
# rm -rf dewy-lang

import subprocess
import os
import sys
import shutil
from pathlib import Path

import pdb

def run(command: list[str]):
    result = subprocess.run(command)
    if result.returncode != 0:
        print(f"Error running command: {' '.join(command)}")
        sys.exit(1)


def main():
    cwd = Path(__file__).parent.absolute()
    os.chdir(cwd)
    run(["git", "clone", "git@github.com:david-andrew/dewy-lang.git"])
    os.chdir("dewy-lang")
    run(["git", "checkout", "188da93"])
    os.chdir(Path("src/compiler"))
    shutil.copyfile(Path("../../../../public/wasm/dewy_old/dewy_parser_wrapper.h").absolute(), Path("dewy_parser_wrapper.h"))
    shutil.copyfile(Path("../../../../public/wasm/dewy_old/dewy_parser_wrapper.c").absolute(), Path("dewy_parser_wrapper.c"))
    run([
        "emcc",
        "dewy_parser_wrapper.c",
        "charset.c",
        "fset.c",
        "gss.c",
        "metaitem.c",
        "metascanner.c",
        "object.c",
        "reduction.c",
        "set.c",
        "sppf.c",
        "tuple.c",
        "ustring.c",
        "vector.c",
        "dictionary.c",
        "gotokey.c",
        "metaast.c",
        "metaparser.c",
        "metatoken.c",
        "parray.c",
        "slice.c",
        "srnglr.c",
        "utilities.c",
        "-o", "dewy_parser_wrapper.js",
        "-s", "EXPORTED_FUNCTIONS=_dewy_parser",
        "-s", "EXPORTED_RUNTIME_METHODS=['ccall', 'cwrap']",
        "-s", "MODULARIZE=1",
        "-s", "EXPORT_NAME='Module'",
        "-s", "ENVIRONMENT='web'",
        "-s", "ASSERTIONS=1",
        "-s", "EXIT_RUNTIME=1",
        "--embed-file", "unicode_cases_be.bin@/unicode_cases_be.bin",
        "--embed-file", "unicode_cases_le.bin@/unicode_cases_le.bin",
        "-O3"
    ])
    shutil.copyfile(Path("dewy_parser_wrapper.js"), Path("../../../../public/wasm/dewy_old/dewy_parser_wrapper.js"))
    shutil.copyfile(Path("dewy_parser_wrapper.wasm"), Path("../../../../public/wasm/dewy_old/dewy_parser_wrapper.wasm"))
    os.chdir(cwd)
    shutil.rmtree("dewy-lang")

if __name__ == "__main__":
    main()