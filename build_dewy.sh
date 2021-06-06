#bash script for building dewy parser demo and placing files in the correct location

# exit on error
set -e

# create a temporary directory to build in
if [ -d "./build_dewy" ]; then rm -rf ./build_dewy; fi
mkdir build_dewy
cd build_dewy

# copy source files from dewy into the temporary directory
cp ../dewy/src/compiler/* ./

# copy the wrapper files (.h & .c) for calling the parser into the directory
cp ../wasm/dewy_parser_wrapper.* ./

# compile the parser to webassembly using emcc
#tbd if we need EXPORT_ALL...
emcc -s EXPORT_ES6=1 -s MODULARIZE=1 -s EXPORT_ALL=1 -s EXPORTED_FUNCTIONS=\"['_dewy_parser']\" -s EXPORTED_RUNTIME_METHODS=\"['cwrap', 'ccall']\" -s ABORT_ON_WASM_EXCEPTIONS=1 -s EXIT_RUNTIME=1 \
    -o dewy_parser_wrapper.js \
	dewy_parser_wrapper.c utilities.c object.c tuple.c metatoken.c dictionary.c vector.c parray.c set.c ustring.c charset.c metaast.c metascanner.c metaparser.c metaitem.c fset.c slice.c gotokey.c reduction.c gss.c sppf.c srnglr.c \
    -lm -g

#copy the built wasm and js module to the correct locations   
cp dewy_parser_wrapper.js ../src/wasm
cp dewy_parser_wrapper.wasm ../src/wasm

# TBD if we should delete the build directory
# cd .. && rm -rf build_dewy