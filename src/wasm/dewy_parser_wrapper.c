#include <stdlib.h>
#include <stdio.h>
#include <stdbool.h>
#include <string.h>

#include "utilities.h"
#include "object.h"
#include "ustring.h"
#include "metatoken.h"
#include "metascanner.h"
#include "metaparser.h"
#include "metaitem.h"
#include "srnglr.h"
#include "dewy_parser_wrapper.h"

// //run the parser wrapper with example inputs
// //TODO->remove this when everythings working
// int main()
// {
//     char *grammar_source = "#E = '(' #ws * #E #ws * ')';\n"
//                            "#E = #E #ws *[+\\-] #ws * #E;\n"
//                            "#E = #E #ws *[*/] #ws * #E;\n"
//                            "#E = #E #ws * '^' #ws * #E;\n"
//                            "#E = #N | #I;\n"
//                            "#N = [0-9]+;\n"
//                            "#I = [A-Za-z_][A-Za-z0-9!@%%&_?]*;\n"
//                            "#ws = [\\n\\x20];\n"
//                            "#start = (#ws* #E)+;";
//     char *input_source = "1+2*3";
//     dewy_parser(grammar_source, input_source);
//     return 0;
// }

void dewy_parser(char *grammar_source, char *input_utf8)
{
    //convert the input source to a uint32_t string, and get its length
    size_t input_utf8_size = utf8_length(input_utf8);
    uint32_t *input_source = ustring_charstar_substr(input_utf8, 0, input_utf8_size - 1);

    //DEBUG just print out the grammar and input
    printf("grammar:\n%s\n\nsource:\n", grammar_source);
    ustring_str(input_source);
    printf("\n");

    //     //set up structures for the sequence of scanning/parsing
    //     initialize_metascanner();
    //     initialize_metaparser();
    //     initialize_srnglr(input_utf8_size);

    //     if (!run_compiler_compiler(grammar_source)) //, verbose, scanner, ast, parser, grammar, table))
    //     {
    //         goto cleanup;
    //     }
    //     if (!run_compiler(input_source)) //, compile, forest))
    //     {
    //         goto cleanup;
    //     }

    // cleanup:
    //     free(grammar_source);
    //     free(input_source);

    //     release_metascanner();
    //     release_metaparser();
    //     release_srnglr();
}
