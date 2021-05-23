import React from 'react'
import { PageContainer } from '../../Components'
import { CodeBlock } from '@atlaskit/code'
import { AtlaskitThemeProvider } from '@atlaskit/theme/components'

/*
Layout

Abstract:
- basic summary
--> what
--> why
--> how
- important links
--> github
--> documentation
--> trello

Work so far
- RNGLR parser


*/

export const DewySpeak = (): JSX.Element => {
    return (
        <>
            <PageContainer>
                <h1>Dewy Programming Language</h1>

                <h2>Meta Language Syntax CFG</h2>
                <AtlaskitThemeProvider mode="dark">
                    <CodeBlock
                        showLineNumbers={false}
                        text={`#eps = 'ϵ' | '\\\\e' | "''" | '""' | "{}";                    // ϵ, \\e, '', "", or {} indicates empty element, i.e. nullable
//#wschar = [\\x9-\\xD\\x20\\x85\\xA0\\x1680\\x2000-\\x200A\\x2028\\x2029\\x202F\\x205F\\x3000]; //ascii + unicode whitespace chars
#wschar = [\\x9-\\xD\\x20];                                    // ascii whitespace characters.
#line_comment = '/' '/' (ξ - '\\n')* '\\n';                   // single line comment
#block_string = ξ* - ξ* '}/';                               // inside of a block comment. Cannot end with block comment delimiter
#block_comment = '/' '{' (#block_comment | #block_string)* '}/';       // block comment, with allowed nested block comments
#ws = (#wschar | #line_comment | #block_comment)*;          // optional whitespace sequence
#anyset = '\\\\' [uUxX] | [VUξ];                              // V, U, ξ, \\U, \\u, \\X, or \\x used to indicate any unicode character
#hex = '\\\\' [uUxX] [0-9a-fA-F]+ / [0-9a-fA-F];              // hex number literal. Basically skipping the number part makes it #any
#number = [0-9]+ / [0-9];                                   // decimal number literal. Used to indicate # of repetitions
#charsetchar = ξ - [\\-\\[\\]] - #wschar;                      // characters allowed in a set are any unicode excluding '-', '[', or ']', and whitespace
#item = #charsetchar | #escape | #hex;                      // items that make up character sets, i.e. raw chars, escape chars, or hex chars
#charset = '[' (#ws #item (#ws '-' #ws #item)? #ws)+ ']';   // set of chars specified literally. Whitespace is ignored, and must be escaped.

//paired grouping operators
#group = '(' #ws #expr #ws ')';                             // group together/force precedence
#char = '"' (ξ - '"' | #escape | #hex) '"';                 // "" single character
#char = "'" (ξ - "'" | #escape | #hex) "'";                 // '' single character
#caseless_char = "{" (ξ - [{}] | #escape | #hex) "}";       // {} single character where case is ignored
#string = '"' (ξ - '"' | #escape | #hex)2+ '"';             // "" string of 2+ characters
#string = "'" (ξ - "'" | #escape | #hex)2+ "'";             // '' string of 2+ characters
#caseless_string = "{" (ξ - [{}] | #escape | #hex)2+ "}";   // {} string of 2+ characters where case is ignored for each character
#escape = '\\\\' ξ;                                           // an escape character. Recognized escaped characters are \\n \\r \\t \\v \\b \\f \\a. 
                                                            // all others just put the second character literally. Common literals include \\\\ \\' \\" \\[ \\] \\-

//post operators
#capture = #expr #ws '.';                                   // group to capture
#star = #expr #ws (#number)? #ws '*';                       // zero or (number or more)
#plus = #expr #ws (#number)? #ws '+';                       // (number or one) or more 
#option = #expr #ws '?';                                    // optional
#count = #expr #ws #number;                                 // exactly number of
#compliment = #set #ws '~';                                 // compliment of. equivalent to #any - #set

//implicit operators
#cat = #expr (#ws #expr)+;                                  // concatenate left and right

//binary expr operators
#or = (#expr #ws '|' #ws #expr) - #union;                   // left or right expression
#reject = (#expr #ws '-' #ws #expr) - #diff;                // reduce left expression only if it is not also the right expression
#nofollow = #expr #ws '/' #ws #expr;                        // reduce left expression only if not followed by right expression
#greaterthan = #expr #ws '>' #ws #expr;                     // left expression has higher precedence than right expression
#lessthan = #expr #ws '<' #ws #expr;                        // left expression has lower precedence than right expression

//binary set operators
#diff = #set #ws '-' #ws #set;                              // everything in left that is not in right
#intersect = #set #ws '&' #ws #set;                         // intersect of left and right. TODO->consider if we should add this as parser filter, rather than just restrict to sets
#union = #set #ws '|' #ws #set;                             // union of left and right

//syntax constructs
#set = #anyset | #char | #caseless_char | #hex | #charset | #compliment | #diff | #intersect | #union;
#expr = #eps | #set | #group | #capture | #string | #caseless_string | #star | #plus | #option | #count 
    | #cat | #or | #greaterthan | #lessthan | #reject | #nofollow | #identifier;
#hashtag = '#' [a-zA-Z] [a-zA-Z0-9~!@#$&_?]* / [a-zA-Z0-9~!@#$&_?];
#rule = #hashtag #ws '=' #ws #expr #ws ';';
#grammar = (#ws #rule)* #ws;
#start = #grammar;`}
                    />
                </AtlaskitThemeProvider>

                <br />
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas efficitur mi a blandit faucibus. Praesent vitae dapibus lorem, eget
                    egestas nisl. Suspendisse condimentum vulputate turpis id sagittis. Nunc sodales augue velit, et porta ante scelerisque ut. Phasellus
                    dapibus suscipit nulla, quis elementum lectus consectetur ut. Pellentesque eu lacus eget libero lacinia posuere. Morbi a arcu ut diam
                    feugiat rutrum. Donec tristique, lacus id mollis ullamcorper, nibh elit ultrices metus, at tincidunt nibh metus ac quam. Donec convallis
                    consequat magna eu ultricies. Pellentesque id libero et lectus venenatis tincidunt. Phasellus vestibulum risus at lorem dignissim sodales.
                    Nam ac varius eros.
                    <br />
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras viverra posuere velit et maximus. Proin laoreet dolor quis sapien pharetra, in
                    faucibus lorem bibendum. Praesent sagittis et nunc non vulputate. Vestibulum sit amet enim in massa feugiat fringilla. In a leo posuere,
                    dictum eros nec, posuere augue. Sed iaculis sit amet nisl sed sollicitudin. Morbi consequat augue non porta porta. Sed maximus ac lorem sed
                    mattis. Maecenas luctus blandit semper. Integer vestibulum ullamcorper nulla, eu accumsan tellus feugiat sed. Vestibulum tempor, risus et
                    condimentum bibendum, ante massa molestie nibh, a mollis diam metus sit amet leo. Sed odio neque, pulvinar vel lacinia ac, facilisis eget
                    massa. Donec tempor lectus justo, at luctus mauris vehicula id. Nullam dictum, nisi in vehicula semper, erat mi aliquet dolor, sit amet
                    sagittis velit dolor at dui. Donec rutrum est et porttitor vulputate. Vestibulum maximus, mi ac tempor posuere, enim ligula condimentum
                    lectus, sed ullamcorper metus felis quis ligula. Proin sit amet tincidunt mauris. Sed gravida velit at lacus lobortis, vel dignissim elit
                    finibus. In consectetur tortor ut odio auctor venenatis. Maecenas et cursus tellus, non mollis dolor. Phasellus molestie porttitor nisl, nec
                    semper diam mollis a. Aliquam nec nibh eget massa scelerisque ultrices. Vestibulum justo libero, accumsan vitae ex id, lacinia mattis massa.
                    Sed eu dui dolor. Suspendisse ac nunc blandit, sagittis lorem ut, ornare neque. Vestibulum arcu urna, elementum in justo eget, sodales
                    tristique elit. Cras condimentum semper tortor, non tristique sem scelerisque eget. Pellentesque habitant morbi tristique senectus et netus
                    et malesuada fames ac turpis egestas. In scelerisque ligula est, ut pharetra tellus egestas non. Aliquam erat volutpat. Maecenas rutrum,
                    erat sit amet volutpat ultrices, risus lacus lacinia purus, aliquet blandit sem tellus in neque. Donec id ipsum neque. Vestibulum imperdiet,
                    quam sed consectetur vulputate, nisi lectus tristique tortor, vitae rutrum dui est sit amet tellus. Praesent gravida consectetur augue, ac
                    ullamcorper enim euismod ac. Ut bibendum mi varius enim laoreet scelerisque. Fusce ut enim eget justo convallis fermentum. Class aptent
                    taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Pellentesque fermentum ultrices elit, vel porttitor libero
                    cursus vel. Integer sit amet mollis lacus. Sed sit amet mauris aliquam, vehicula quam vitae, feugiat orci. Fusce congue dictum massa. Sed
                    bibendum auctor enim ac cursus. Nunc sed diam quis mi congue volutpat. Pellentesque habitant morbi tristique senectus et netus et malesuada
                    fames ac turpis egestas. Sed nec tellus magna. Nullam et velit dignissim, ornare nunc a, scelerisque nisl. Quisque rhoncus magna sed nibh
                    tincidunt, nec pretium arcu ultrices. Vivamus condimentum magna ante, eget faucibus diam blandit ac.
                </p>
            </PageContainer>
        </>
    )
}
