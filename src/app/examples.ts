export interface Example {
  query: string;
  old: string;
  new: string;
}

export const EXAMPLES_JAVA: Example[] = [
  { query: 'Java 1', old: 'if (ID<0>) { \n<...>', new: 'if (ID<0> && EXPR) { \n<...>'},
  { query: 'Java 2', old: 'if (ID<0>) { \n<...>', new: 'if (ID<0> || EXPR) { \n<...>'},
  { query: 'Java 3', old: 'EXPR.ID<0>();', new: 'EXPR.ID<0>();'},
  { query: 'Java 4', old: 'return ID;', new: 'return null;'},
  { query: 'Java 5', old: 'EXPR<0>.ID()', new: 'EXPR<0>.ID()'},
  { query: 'Java 6', old: 'ID<0>();', new: 'ID<0>(<...>);'},
  { query: 'Java 7', old: 'ID<0>(ID);', new: 'ID<0>();'},
  { query: 'Java 8', old: 'this.ID<0> = ID.ID(ID<0>);', new: 'this.ID<0> = ID<0>;'},
  { query: 'Java 9', old: 'final ID<0> ID<1> = EXPR;', new: 'final ID<0> ID<1> = EXPR;'},
  { query: 'Java 10', old: 'ID(EXPR); ID(EXPR);', new: 'ID(EXPR); ID(EXPR);'},
  { query: 'Java 11', old: '<...> ID(<...>) {', new: '<...> ID(<...>) throws ID {'},
  { query: 'Java 12', old: '<...> ID(<...>) throws ID {', new: '<...> ID(<...>) {'},
];

// Only for testing the functionality
export const EXAMPLES_JAVASCRIPT: Example[] = [
  { query: 'JavaScript 1', old: '_', new: 'ID.ID = <...>; _'},
  { query: 'JavaScript 2', old: '_', new: 'ID.ID = LT;'},
  { query: 'JavaScript 3', old: 'ID<0>: LT', new: 'ID<0>: LT'},
  { query: 'JavaScript 4', old: 'this.ID<0>(EXPR);', new: 'this.ID<0>(EXPR);'},
  { query: 'JavaScript 5', old: 'if (ID) { ID.ID(<...>);', new: '<...>'},
  { query: 'JavaScript 6', old: '<...> = EXPR<0>;', new: '<...> = EXPR<0> binOP EXPR;'},
  { query: 'JavaScript 7', old: 'return EXPR;', new: '_'},
  { query: 'JavaScript 8', old: 'ID.ID(<...>);', new: '_'},
  { query: 'JavaScript 9', old: 'ID();', new: '_'},
  { query: 'JavaScript 10', old: 'ID<0>.ID<1>(<...>);', new: 'ID<2>.ID<1>(<...>);'},


];

// Only for testing the functionality
export const EXAMPLES_PYTHON: Example[] = [];
