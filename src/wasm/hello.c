#include <stdio.h>

int func(int a, int b)
{
    printf("Hello from wasm!\n");
    return a + b;
}