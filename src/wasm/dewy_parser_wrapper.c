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

void dewy_parser(char *grammar_source, char *input_utf8)
{
    //convert the input source to a uint32_t string, and get its length
    size_t input_utf8_size = utf8_length(input_utf8);
    uint32_t *input_source = ustring_charstar_substr(input_utf8, 0, input_utf8_size - 1);

    //DEBUG just print out the grammar and input
    // printf("grammar:\n%s\n\nsource:\n", grammar_source);
    // ustring_str(input_source);
    // printf("\n");

    //set up structures for the sequence of scanning/parsing
    initialize_metascanner();
    initialize_metaparser();
    initialize_srnglr(input_utf8_size);

    if (!run_compiler_compiler(grammar_source, false, false, false, false, false, false))// false, false, true, true, true, true)) //, verbose, scanner, ast, parser, grammar, table))
    {
        goto cleanup;
    }
    if (!run_compiler(input_source, true, true))// true, true)) //, compile, forest))
    {
        goto cleanup;
    }

cleanup:
    free(grammar_source);
    free(input_source);

    release_metascanner();
    release_metaparser();
    release_srnglr();
}

/**
 * Run all steps in the compiler, and print out the intermediate results if the 
 * corresponding bool is true. If verbose is true, print out more structure info.
 * returns whether or not compiler_compiler step completed successfully
 */
bool run_compiler_compiler(char *source, bool verbose, bool scanner, bool ast, bool parser, bool grammar, bool table)
{
    vect *tokens = new_vect();
    obj *t = NULL;

    //SCANNER STEP: collect all tokens from raw text
    while (*source != 0 && (t = scan(&source)) != NULL)
    {
        vect_push(tokens, t);
    }
    if (scanner) //print scanning result
    {
        printf("METASCANNER OUTPUT:\n");
        print_scanner(tokens, verbose);
        printf("\n\n");
    }
    if (*source != 0) //check for errors scanning
    {
        printf("ERROR: metascanner failed\n");
        printf("unscanned source:\n```\n%s\n```\n\n", source);
        vect_free(tokens);
        return false;
    }

    //AST & PARSER STEP: build ASTs from tokens, and then convert to CFG sentences
    if (ast)
    {
        printf("METAAST OUTPUT:\n");
    }
    while (metatoken_get_next_real_token(tokens, 0) >= 0)
    {
        if (!metaparser_is_valid_rule(tokens))
        {
            break;
        }

        obj *head = metaparser_get_rule_head(tokens);
        uint64_t head_idx = metaparser_add_symbol(head);
        vect *body_tokens = metaparser_get_rule_body(tokens);
        metaast *body_ast = metaast_parse_expr(body_tokens);
        if (ast)
        {
            print_ast(head_idx, body_ast, verbose);
        }

        //apply ast reductions if possible
        if (body_ast != NULL)
        {
            //count if any reductions were performed
            int reductions = 0;
            while ((metaast_fold_constant(&body_ast)) && ++reductions)
                ;

            if (ast && reductions > 0)
            {
                printf("Reduced AST: ");
                print_ast(head_idx, body_ast, verbose);
            }

            //attempt to convert metaast into sentential form
            metaparser_insert_rule_ast(head_idx, body_ast);
        }
        else //error while constructing tree
        {
            vect_free(tokens);
            return false;
        }
    }

    //error if any unparsed (non-whitespace/comment) meta tokens
    if (metatoken_get_next_real_token(tokens, 0) >= 0)
    {
        printf("ERROR: metaparser failed\n");
        printf("unparsed tokens:\n");
        print_scanner(tokens, verbose);
        printf("\n\n");
        vect_free(tokens);
        return false;
    }

    //finalize the metaparser before running the rnglr processes
    complete_metaparser();
    vect_free(tokens);

    if (ast)
    {
        printf("\n\n");
    }

    if (parser)
    {
        printf("METAPARSER OUTPUT:\n");
        print_parser(verbose);
        printf("\n\n");
    }

    //GRAMMAR ITEMSET STEP: generate the itemsets for the grammar
    srnglr_generate_grammar_itemsets();
    if (grammar)
    {
        printf("GRAMMAR OUTPUT:\n");
        print_grammar();
        printf("\n\n");
    }

    //SRNGLR TABLE: print out the generated srnglr table for the grammar
    if (table)
    {
        printf("SRNGLR TABLE:\n");
        print_table();
        printf("\n\n");
    }

    return true;
}

/**
 * Parse the input file according to the input grammar.
 */
bool run_compiler(uint32_t *source, bool compile, bool forest)
{
    bool result = srnglr_parser(source);

    if (compile)
    {
        printf("PARSE RESULT:\n%s\n\n", result ? "success" : "failure");
        print_compiler();
        printf("\n\n");
    }

    return result;
}

/**
 * Print the output of the scanner step
 */
void print_scanner(vect *tokens, bool verbose)
{
    for (size_t i = 0; i < vect_size(tokens); i++)
    {
        metatoken *t = vect_get(tokens, i)->data;
        verbose ? metatoken_repr(t) : metatoken_str(t);
        if (verbose && i < vect_size(tokens) - 1)
        {
            printf(" ");
        } //space after each verbose token
        if (t->type == comment && t->content[1] == '/')
        {
            printf("\n");
        } //print a newline after singleline comments. TODO->maybe have single line comments include the newline?
    }
}

/**
 * Print the output of a single ast from the ast parse step.
 */
void print_ast(uint64_t head_idx, metaast *body_ast, bool verbose)
{
    obj *head = metaparser_get_symbol(head_idx);
    obj_str(head);
    if (body_ast != NULL)
    {
        printf(" = ");
        if (verbose)
        {
            metaast_repr(body_ast);
        }
        else
        {
            metaast_str(body_ast);
            printf("\n");
        }
    }
    else
    {
        printf(" = NULL\n");
    }
}

/**
 * Print the output of the CFG covnersion step
 */
void print_parser(bool verbose)
{
    verbose ? metaparser_productions_repr() : metaparser_productions_str();
}

/**
 * Print out the itemsets generated by the grammar.
 */
void print_grammar()
{

    printf("first sets:\n");
    srnglr_print_firsts();

    printf("itemsets:\n");
    srnglr_print_itemsets();
}

/**
 * Print out the srnglr table generated by the grammar.
 */
void print_table()
{
    srnglr_print_table();
}

/**
 * Print out the GSS generated during parsing of the input.
 */
void print_compiler()
{
    // srnglr_print_gss();
    srnglr_print_sppf();
}