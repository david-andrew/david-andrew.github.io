#include <stdint.h>
#include <string.h>

#include "ustring.h"
#include "utilities.h"

size_t cstring_to_ustring(char *src, uint32_t **dest);

void dewy_parser(char *grammar_source, char *input_utf8)
{
    //convert the input source to a uint32_t string
    uint32_t *input_source;
    size_t input_size = cstring_to_ustring(input_utf8, &input_source);

    //set up structures for the sequence of scanning/parsing
    initialize_metascanner();
    initialize_metaparser();
    initialize_srnglr(input_size);

    if (!run_compiler_compiler(grammar_source)) //, verbose, scanner, ast, parser, grammar, table))
    {
        goto cleanup;
    }
    if (!run_compiler(input_source)) //, compile, forest))
    {
        goto cleanup;
    }

cleanup:
    free(grammar_source);
    free(input_source);

    release_metascanner();
    release_metaparser();
    release_srnglr();

    return 0;
}

size_t cstring_to_ustring(char *src, uint32_t **dest)
{
    //compute number of unicode characters in string
    size_t length = utf8_length(src);

    //get the unicode version of the string by taking a unicode substring of the whole length
    *dest = ustring_charstar_substr(src, 0, length - 1);

    return length;
}