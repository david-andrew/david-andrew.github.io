#include <stdio.h>
#include <stdlib.h>

int func(int a, int b)
{
    printf("Hello from wasm!\n");
    return a + b;
}

void func2(char *a, char *b)
{
    printf("wasm strings: `%s` : `%s`\n", a, b);
}

void segfault(char *a, char *b)
{
    printf("attempting to cause a segfault\n");
    // int c[] = {};
    // putchar(c[0]); //should cause segfault
    exit(1);
    printf("\nafter segfault\n");
}