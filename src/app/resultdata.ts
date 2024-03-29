import * as internal from "events";

export interface ResultData {
  c: string; // commit url
  cm: string; // commit message
  o: string; // codeChangeOld
  n: string; // codeChangeNew
  p: string; // projectname
  fn: string; // fileNameNew
  f: string; // fileNameOld
  l: number; // lineOld
  lN: number; // lineNew
}
