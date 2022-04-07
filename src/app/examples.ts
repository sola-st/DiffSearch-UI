export interface Example {
  query: string;
  old: string;
  new: string;
}

export const EXAMPLES_JAVA: Example[] = [
  { query: 'Fix incomplete if-condition', old: 'if (ID<0>) { \n  <...>', new: 'if (ID<0> && EXPR) { \n   <...>'},
  { query: 'Add empty catch', old: '<...>', new: 'try {\n  <...>\n} catch(ID ID) {}'},
  { query: 'Use more specific assertion', old: 'assert(EXPR);', new: 'assertTrue(EXPR);'},
  { query: 'Replace base object of method call', old: 'EXPR.ID<0>();', new: 'EXPR.ID<0>();'},
  { query: 'Return null instead of a variable', old: 'return ID;', new: 'return null;'},
  { query: 'Change callee', old: 'EXPR<0>.ID()', new: 'EXPR<0>.ID()'},
  { query: 'Add arguments to call', old: 'ID<0>();', new: 'ID<0>(<...>);'},
  { query: 'Remove arguments from call', old: 'ID<0>(ID);', new: 'ID<0>();'},
  { query: 'Replace method call with variable', old: 'this.ID<0> = ID.ID(ID<0>);', new: 'this.ID<0> = ID<0>;'},
  { query: 'Java 10', old: 'final ID<0> ID<1> = EXPR;', new: 'final ID<0> ID<1> = EXPR;'},
  { query: 'Modify two consecutive calls', old: 'ID(EXPR); \nID(EXPR);', new: 'ID(EXPR);\nID(EXPR);'},
  { query: 'Add missing throws clause', old: '<...> ID(<...>) {', new: '<...> ID(<...>) throws ID {'},
  { query: 'Remove throws clause', old: '<...> ID(<...>) throws ID {', new: '<...> ID(<...>) {'},
];

// Only for testing the functionality
export const EXAMPLES_JAVASCRIPT: Example[] = [
  { query: 'Fix incomplete if-condition', old: 'if (ID<0>) { <...>', new: 'if (ID<0> && EXPR) { <...>'},
  { query: 'Get rid of eval() call', old: 'eval(<...>)', new: '<...>'},
  { query: 'Modify string replacement', old: '<...>.replace(<...>, <...>)', new: '<...>.replace(<...>, <...>)'},
  { query: 'Return null instead of a variable', old: 'return ID;', new: 'return null;'},
  { query: 'Update require statement', old: 'ID = require(EXPR)', new: 'ID = require(EXPR)'},
  { query: 'Add second argument to call', old: 'EXPR<0>(EXPR)', new: 'EXPR<0>(EXPR, EXPR)'},
  { query: 'Replace method call with variable', old: 'this.ID<0> = ID.ID(ID<0>);', new: 'this.ID<0> = ID<0>;'},
  { query: "Use EcmaScript 6 'let' instead of 'var'", old: 'var ID<0> = EXPR<1>', new: 'let ID<0> = EXPR<1>'},
  { query: 'Modify two consecutive calls', old: 'ID(EXPR);\nID(EXPR);', new: 'ID(EXPR);\nID(EXPR);'},
  { query: 'Add a conditional throws', old: '<...>', new: 'if (<...>) {\n  throw EXPR'},


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

