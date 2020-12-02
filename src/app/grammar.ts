export interface Grammar {
  nt: string;     // nonterminal
  symbol: string; // metasymbol
  tn: string; // terminal normal string
  ti: string;      // terminal (italic string)
}

export const GRAMMAR: Grammar[] = [
  { nt: 'Query', symbol: '::=', tn: '', ti: 'Snippet -> Snippet'},
  { nt: 'Snippet', symbol: '::=', tn: '', ti: 'Stmt*'},
  { nt: '', symbol: '|', tn: '', ti: 'Expression'},
  { nt: '', symbol: '|', tn: '_', ti: ''},
  { nt: 'Stmt', symbol: '::=', tn: '', ti: '<...>'},
  { nt: '', symbol: '|', tn: '(Usual rules of target language)', ti: ''},
  { nt: 'Expression', symbol: '::=', tn: 'EXPR', ti: ''},
  { nt: '', symbol: '|', tn: 'EXPR', ti: '<number>'},
  { nt: '', symbol: '|', tn: '(Usual rules of target language)', ti: ''},
  { nt: 'AssignmentOperator', symbol: '::=', tn: 'OP', ti: ''},
  { nt: '', symbol: '|', tn: 'OP', ti: '<number>'},
  { nt: '', symbol: '|', tn: '(Usual rules of target language)', ti: ''},
  { nt: 'BinaryOperator', symbol: '::=', tn: 'binOP', ti: ''},
  { nt: '', symbol: '|', tn: 'binOP', ti: '<number>'},
  { nt: '', symbol: '|', tn: '(Usual rules of target language)', ti: ''},
  { nt: 'UnaryOperator', symbol: '::=', tn: 'unOP', ti: ''},
  { nt: '', symbol: '|', tn: 'unOP', ti: '<number>'},
  { nt: '', symbol: '|', tn: '(Usual rules of target language)', ti: ''},
  { nt: 'Identifier', symbol: '::=', tn: 'ID', ti: ''},
  { nt: '', symbol: '|', tn: 'ID', ti: '<number>'},
  { nt: '', symbol: '|', tn: '(Usual rules of target language)', ti: ''},
  { nt: 'Literal', symbol: '::=', tn: 'LT', ti: ''},
  { nt: '', symbol: '|', tn: 'LT', ti: '<number>'},
  { nt: '', symbol: '|', tn: '(Usual rules of target language)', ti: ''},
];
