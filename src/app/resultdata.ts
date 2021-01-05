export interface ResultData {
  url: string;
  hunkLines: string;
  codeChangeOld: string;
  codeChangeNew: string;
  query: string;
  fullChangeString: string;
  rank: number;
  numberOfCandidateChanges: number;
}
