#include <stdio.h>

int func(int a, int b)
{
    printf("Hello from wasm!\n");
    return a + b;
}

void func2(char *a, char *b)
{
    printf("wasm strings: `%s` : `%s`\n", a, b);
}