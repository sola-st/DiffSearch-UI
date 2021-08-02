export interface Example {
  query: string;
  old: string;
  new: string;
}

export const EXAMPLES_JAVA: Example[] = [
  { query: 'Same function, change caller', old: 'EXPR.ID<0>();', new: 'EXPR.ID<0>();'},
  { query: 'Change binary operator', old: 'EXPR<0> binOP EXPR<1>', new: 'EXPR<0> binOP EXPR<1>'},
  { query: 'More specific if', old: 'if (ID<0>) { \n<...>', new: 'if (ID<0> && EXPR) { \n<...>'},
  { query: 'Less specific if', old: 'if (ID<0>) { \n<...>', new: 'if (ID<0> || EXPR) { \n<...>'},
  { query: 'Fix wrong function', old: 'EXPR<0>.ID()', new: 'EXPR<0>.ID()'},
  { query: 'Same function, more arguments', old: 'ID<0>();', new: 'ID<0>(<...>);'},
  { query: 'Same function, less arguments', old: 'ID<0>(ID);', new: 'ID<0>();'},
  { query: 'Same function, swap arguments', old: 'ID<2>(ID<1>, ID<0>)', new: 'ID<2>(ID<0>, ID<1>)'},
  { query: 'Change unary operator', old: 'ID<0>(<...>) unOP;', new: 'ID<0>(<...>) unOP;'},
  { query: 'Change binary operand', old: 'EXPR binOP<0> EXPR', new: 'EXPR binOP<0> EXPR'},
  { query: 'Missing throw exception', old: '<...> ID(<...>) {', new: '<...> ID(<...>) throws ID {'},
  { query: 'Delete throw exception', old: '<...> ID(<...>) throws ID {', new: '<...> ID(<...>) {'},
];

// Only for testing the functionality
export const EXAMPLES_JAVASCRIPT: Example[] = [
  { query: 'JavaScript 1', old: 'if (ID<0> < ID<1>)', new: 'if (ID<0> > ID<1>)'},
  { query: 'JavaScript 2', old: 'while (ID<0> < ID<1>)', new: 'while (ID<0> > ID<1>)'},
];

// Only for testing the functionality
export const EXAMPLES_PYTHON: Example[] = [
  { query: 'Python 1', old: 'for ID<0> in range (LT, LT)' , new: 'for ID<0> in range (LT, LT)'},
  { query: 'Python 2', old: 'while ID<0> <= ID', new: 'while ID<0> < ID'},
];
