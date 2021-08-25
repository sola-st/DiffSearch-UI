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
  { query: 'JavaScript 1', old: 'ID();', new: 'ID();'},
  { query: 'JavaScript 2', old: 'ID binOP<0> LT;', new: 'ID binOP<1> LT;'},
  { query: 'JavaScript 3', old: 'if(EXPR<0>){ID OP LT;}', new: 'if(EXPR<1>){ID OP LT;}'},
  { query: 'JavaScript 4', old: 'if(EXPR<0>){<...>}', new: 'if(EXPR<1>){<...>}'},
  { query: 'JavaScript 5', old: 'ID = ID;', new: 'ID = ID;'},
  { query: 'JavaScript 6', old: '<...>', new: 'try { <...> } catch (ID ID) { <...> }'},
  { query: 'JavaScript 7', old: 'while (ID()) {', new: 'while (ID(<...>)) {'},
  { query: 'JavaScript 8', old: 'unOP EXPR<0>;', new: 'unOP EXPR<0>;'},
  { query: 'JavaScript 9', old: '_ ', new: 'EXPR(ID);'},
  { query: 'JavaScript 10', old: 'ID<0>.ID<1>(<...>);', new: 'ID<2>.ID<1>(<...>);'},


];

// Only for testing the functionality
export const EXAMPLES_PYTHON: Example[] = [
  { query: 'Python 1', old: 'ID()' , new: 'ID()'},
  { query: 'Python 2', old: 'ID binOP LT', new: 'ID binOP LT'},
  { query: 'Python 3', old: 'ID = ID', new: 'ID = ID'},
  { query: 'Python 4', old: '<...>', new: 'try: <...> except (ID): <...>'},
  { query: 'Python 5', old: 'if ID != null:', new: 'if ID == null:'},
  { query: 'Python 6', old: 'if EXPR != null:', new: 'if EXPR == null:'},
  { query: 'Python 7', old: '_', new: 'EXPR(EXPR);'},
  { query: 'Python 8', old: 'while EXPR:', new: 'while ID(<...>):'},
  { query: 'Python 9', old: 'EXPR<0> binOP EXPR<1>', new: 'EXPR<0> binOP EXPR<1>'},
  { query: 'Python 10', old: 'unOP EXPR<0>', new: 'unOP EXPR<0>'},
];
