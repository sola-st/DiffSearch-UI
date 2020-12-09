import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ResultData } from './resultdata';
@Injectable({
  providedIn: 'root'
})

export class QueryService {

  // private queryUrl = 'http://localhost:8843/';
  private queryUrl = 'http://localhost:4200/api';  // see proxy.conf.json

  resultdata: ResultData[] = [];
  errorMessage = '';
  noChanges = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    .set('access-control-allow-origin', 'http://localhost:8843/')
  };

  constructor(private http: HttpClient) { }

  getResult(queryold: string, querynew: string): void{
    // console.log('in getResult');
    // reset all variables
    this.resultdata = [];
    this.errorMessage = '';
    this.noChanges = false;

    this.getQueryResult(queryold, querynew)
    .subscribe(rd => {
      console.log (rd);
      if (rd.length === 0) {
        this.noChanges = true;
      }
      if ((rd.length === 1) && (rd[0].url.startsWith('The query is not correct'))) {
        this.errorMessage = rd[0].url;  // message in rd[0]
      }else {
        this.resultdata = rd;
      }
    });
    // this.getQueryResult(queryold, querynew)
    //  .subscribe(rd => {this.resultdata = rd;});
     // console.log ('url ' + this.resultdata[0].url);
  }

  getCodeChanges(): ResultData[] {
    // console.log(this.resultdata);
    return this.resultdata;
  }

  getQueryResult(oldquery: string, newquery: string): Observable<ResultData[]> {
    // console.log (oldquery + '->' + newquery);
    const params = new HttpParams().set('Text1', oldquery).set('Text2', newquery);
    // console.log(params);
    return this.http.get<ResultData[]>(this.queryUrl, {params})
      .pipe(
        catchError(this.handleError<ResultData[]>('getQeryResult', [])));
    // return this.http.get<ResultData[]>(this.queryUrl, {params})
    //   .pipe(
    //     catchError(this.handleError<ResultData[]>('getQeryResult', []))
    //    );
    //    .subscribe(rd => { console.log (rd); this.resultdata = rd; });
    //   .pipe(
    //     catchError(this.handleError<ResultData[]>('getQeryResult', []))
    //    );

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
