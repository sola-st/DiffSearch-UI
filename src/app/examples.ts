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
  { query: 'JavaScript 1', old: 'if (ID<0>) { <...>', new: 'if (ID<0> && EXPR) { <...>'},
  { query: 'JavaScript 2', old: 'if (ID<0>) { <...>', new: 'if (ID<0> || EXPR) { <...>'},
  { query: 'JavaScript 3', old: 'EXPR.ID<0>();', new: 'EXPR.ID<0>();'},
  { query: 'JavaScript 4', old: 'return ID;', new: 'return null;'},
  { query: 'JavaScript 5', old: 'EXPR<0>.ID()', new: 'EXPR<0>.ID()'},
  { query: 'JavaScript 6', old: 'ID<0>(ID);', new: 'ID<0>();'},
  { query: 'JavaScript 7', old: 'this.ID<0> = ID.ID(ID<0>);', new: 'this.ID<0> = ID<0>;'},
  { query: 'JavaScript 8', old: 'ID<0> = EXPR;', new: 'ID<0> = EXPR;'},
  { query: 'JavaScript 9', old: 'ID(EXPR); ID(EXPR);', new: 'ID(EXPR); ID(EXPR);'},
  { query: 'JavaScript 10', old: '<...>', new: 'if (<...>) { throw EXPR'},
  { query: 'JavaScript 11', old: 'throw EXPR', new: '_'},


];

// Only for testing the functionality
export const EXAMPLES_PYTHON: Example[] = [
  { query: 'Python 1', old:'if ID<0>: <...>', new: 'if ID<0> and EXPR: <...>'},
  { query: 'Python 2', old:'if ID<0>: <...>', new: 'if ID<0> or EXPR: <...>'},
  { query: 'Python 3', old:'EXPR.ID<0>()', new: 'EXPR.ID<0>()'},
  { query: 'Python 4', old:'ID<0>.ID(<...>)', new: 'ID<0>.ID(<...>)'},
  { query: 'Python 5', old:'return ID', new: 'return None'},
  { query: 'Python 6', old:'EXPR<0>.ID()', new: 'EXPR<0>.ID()'},
  { query: 'Python 7', old:'ID.ID.ID()', new: 'ID.ID.ID()'},
  { query: 'Python 8', old:'ID = ID<0>.ID(ID)', new: 'ID<0>.ID(ID)'},
  { query: 'Python 9', old:'ID<0>(EXPR)', new: 'ID<0>(EXPR)'},
  { query: 'Python 10', old:'while(EXPR): <...>', new: 'while(EXPR): <...>'},
  { query: 'Python 11', old:'print(LT)', new: 'print(LT)'}
];

