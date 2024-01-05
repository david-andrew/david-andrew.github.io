/*
state object gets passed when reading a token, can be mutated by tokenizer
- must define `startState` method on `mode` object. startState = () => StateObject
all modes define `token = (stream, state) => StylingString | null` method

*/
