import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ResultData } from './resultdata';
import { ConditionalExpr } from '@angular/compiler';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { timingSafeEqual } from 'crypto';
@Injectable({
  providedIn: 'root'
})

export class QueryService {

  // private queryUrl = 'http://localhost:8843/';
  private queryUrl = 'http://localhost:4200/api';  // see proxy.conf.json

  serverdata: ServerData = {outputList: [], duration: '', changesnumber: ''};

  // resultdata: ResultData[] = [];
  errorMessage = '';
  noChanges = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    .set('access-control-allow-origin', 'http://localhost:8843/')
  };

  constructor(private http: HttpClient) { }

  // getResult(queryold: string, querynew: string): void{
  //   // console.log('in getResult');
  //   // reset all variables
  //   this.duration = '';
  //   this.changesnumber = '';
  //   this.resultdata = [];
  //   this.errorMessage = '';
  //   this.noChanges = false;

  //   // the last entry contains the duration information
  //   this.getQueryResult(queryold, querynew)
  //   .subscribe(rd => {
  //     console.log (rd);
  //     console.log (rd.length);
  //     if (rd.length === 1) {  // contains only the duration entry
  //       this.noChanges = true;
  //       this.duration = rd[0].url;
  //       this.changesnumber = rd[0].hunkLines;
  //     } else if ((rd.length === 2) && (rd[0].url.startsWith('The query is not correct'))) {
  //       this.errorMessage = rd[0].url;  // message in rd[0]
  //       this.duration = rd[1].url; // duration info in last entry
  //       this.changesnumber = rd[1].hunkLines;

  //     // }else if ((rd.length === 1) && (rd[0].url.startsWith('No Matching '))) {
  //     //   this.errorMessage = rd[0].url;  // message in rd[0]
  //     } else {
  //       this.resultdata = rd;
  //       this.duration = rd[rd.length-1].url; // duration info in last entry
  //       this.changesnumber = rd[rd.length-1].hunkLines;
  //       this.resultdata.pop();
  //       console.log (rd);
  //     }
  //   });
  //   // this.getQueryResult(queryold, querynew)
  //   //  .subscribe(rd => {this.resultdata = rd;});
  //    // console.log ('url ' + this.resultdata[0].url);
  // }

  getResult(queryold: string, querynew: string): void{
    // reset all variables
    this.serverdata = {outputList: [], duration: '', changesnumber: ''};
    this.noChanges = false;
    this.errorMessage = '';

    this.getQueryResult(queryold, querynew)
    .subscribe(rd => {
      console.log (rd);
      console.log (rd.outputList.length);
      this.serverdata = rd;
        if (rd.outputList.length === 0) {
         this.noChanges = true;
        } else if ((rd.outputList.length === 1) && (rd.outputList[0].url.startsWith('The query is not correct'))) {
          this.errorMessage = this.serverdata.outputList[0].url;  // message in outputList[0]
          this.serverdata.outputList.pop(); // remove the error message from outputList
        }
    });

    // this.getQueryResult(queryold, querynew)
    //  .subscribe(rd => {this.resultdata = rd;});
     // console.log ('url ' + this.resultdata[0].url);
  }

  getCodeChanges(): ResultData[] {
    // return this.resultdata;
    return this.serverdata.outputList;
  }

  // getQueryResult(oldquery: string, newquery: string): Observable<ResultData[]> {
  //   // console.log (oldquery + '->' + newquery);
  //   const params = new HttpParams().set('Text1', oldquery).set('Text2', newquery);
  //   // console.log(params);
  //   return this.http.get<ResultData[]>(this.queryUrl, {params})
  //     .pipe(
  //       catchError(this.handleError<ResultData[]>('getQeryResult', [])));
  //   // return this.http.get<ResultData[]>(this.queryUrl, {params})
  //   //   .pipe(
  //   //     catchError(this.handleError<ResultData[]>('getQeryResult', []))
  //   //    );
  //   //    .subscribe(rd => { console.log (rd); this.resultdata = rd; });
  //   //   .pipe(
  //   //     catchError(this.handleError<ResultData[]>('getQeryResult', []))
  //   //    );

  // }
  getQueryResult(oldquery: string, newquery: string): Observable<ServerData> {
    // console.log (oldquery + '->' + newquery);
    const params = new HttpParams().set('Text1', oldquery).set('Text2', newquery);
    // console.log(params);
    return this.http.get<ServerData>(this.queryUrl, {params})
      .pipe(
        catchError(this.handleError<ServerData>('getQeryResult')));
  }

  private handleError<T>(operation = 'operation', result?: T): any|Observable<T>{
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log ('in handleError');
      console.error(error); // log to console instead
      this.errorMessage = error;

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
export interface ServerData {
  outputList: ResultData[];
  duration: string;
  changesnumber: string;
}
