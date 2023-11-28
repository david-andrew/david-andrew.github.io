#include <stdio.h>



void test_fn() {
    printf("Hello from C!\n");
}

int add_fn(int a, int b) {
    printf("%d + %d = %d\n", a, b, a + b);
    return a + b;
}