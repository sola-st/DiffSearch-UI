export interface Example {
  query: string;
  old: string;
  new: string;
}

export const EXAMPLES: Example[] = [
  { query: 'Same function, change caller', old: 'EXPR.ID<0>();', new: 'EXPR.ID<0>();'},
  { query: 'Change binary operator', old: 'EXPR<0> binOP EXPR<1>', new: 'EXPR<0> binOP EXPR<1>'},
  { query: 'More specific if', old: 'if (ID<0>) { <...>', new: 'if (ID<0> && EXPR) { <...>'},
  { query: 'Less specific if', old: 'if (ID<0>) { <...>', new: 'if (ID<0> || EXPR) { <...>'},
  { query: 'Fix wrong function', old: 'EXPR<0>.ID()', new: 'EXPR<0>.ID()'},
  { query: 'Same function, more arguments', old: 'ID<0>();', new: 'ID<0>(<...>);'},
  { query: 'Same function, less arguments', old: 'ID<0>(ID);', new: 'ID<0>();'},
  { query: 'Same function, swap arguments', old: 'ID<2>(ID<1>, ID<0>)', new: 'ID<2>(ID<0>, ID<1>)'},
  { query: 'Changes unary operator', old: 'ID<0>(<...>) unOP;', new: 'ID<0>(<...>) unOP;'},
  { query: 'Changes binary operator', old: 'EXPR binOP<0> EXPR', new: 'EXPR binOP<0> EXPR'},
  { query: 'Missing throw exception', old: '<...> ID(<...>) {', new: '<...> ID(<...>) throws ID {'},
  { query: 'Delete throw exception', old: '<...> ID(<...>) throws ID {', new: '<...> ID(<...>) {'},
];
