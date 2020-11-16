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
  private queryUrl = 'http://localhost:4200/api';
  resultdata: ResultData[] = [];

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    .set('access-control-allow-origin', 'http://localhost:8843/')
  };

  constructor(private http: HttpClient) { }

  getResult(queryold: string, querynew: string): void{
    console.log('in getResult');
    this.getQueryResult(queryold, querynew)
    .subscribe(rd => { this.resultdata = rd });
    // console.log ('url ' + this.resultdata[0].url);
  }

  getCodeChanges(): ResultData[] {
    // console.log(this.resultdata);
    return this.resultdata;
  }

  getQueryResult(oldquery: string, newquery: string): Observable<ResultData[]> {
    console.log('getQueryResult');
    console.log (oldquery + '->' + newquery);
    const params = new HttpParams().set('Text1', oldquery).set('Text2', newquery);
    console.log(params);
    return this.http.get<ResultData[]>(this.queryUrl, {params})
     .pipe(
       catchError(this.handleError<ResultData[]>('getQeryResult', []))
       );
    // return this.http.get<ResultData[]>(this.queryUrl, {params})
    //   .pipe(
    //     catchError(this.handleError<ResultData[]>('getQeryResult', []))
    //    );
    //    .subscribe(rd => { console.log (rd); this.resultdata = rd; });
    //   .pipe(
    //     catchError(this.handleError<ResultData[]>('getQeryResult', []))
    //    );

  }

  // test_server () {
  //   console.log ('in test_server');
  //   //let antwort = this.http.get<any>(this.queryUrl);
  //   const params = new HttpParams().set('Text1', 'old1').set('Text2', 'old2');
  //   console.log (this.queryUrl);
  //   this.http.get<ResultData[]>(this.queryUrl, {params})
  //    .pipe(
  //      catchError(this.handleError<ResultData[]>('getQeryResult', []))
  //      );
  //   // this.http.get(this.queryUrl)
  //   //  .pipe(
  //   //    catchError(this.handleError<any>('test_server', []))
  //   //    );
  //   //console.log ('antwort: ' + antwort);
  // }

  private handleError<T>(operation = 'operation', result?: T): any|Observable<T>{
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.log ('in handleError')
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
