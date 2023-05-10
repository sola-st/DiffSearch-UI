import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,  HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError} from 'rxjs/operators';
import { ResultData } from './resultdata';

import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class QueryService {

  // private queryUrl = 'http://localhost:8843/';
  private queryUrl = environment.API_URL;
  // private queryUrl = 'http://localhost:4200/api';  // see proxy.conf.json

  // save the last queries for re-route
  oldquery = '';
  newquery = '';

  // save the selected language (Java is default)
  language = 'Java';

  serverdata: ServerData = {outputList: [], duration: '', changesnumber: ''};

  errorMessage = '';
  noChanges = false;

  newSearch = false;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    .set('access-control-allow-origin', 'http://localhost:8843/')
  };

  loading = false; // for spinner in query.componente

  // Filter
  options: Option[] = [
    {value: 'included', text: 'included'},
    {value: 'notincluded', text: 'not included'}
  ]

  filterdata: Filter [] = [
    {key: 'cm', name: 'Commit message', changed: false, placeholder: 'commit message contains this text', data: '', option: this.options[0].value},
    {key: 'f', name: 'File path', changed: false, placeholder: '/foo/bar/main.java', data: '', option: this.options[0].value}
  ]

  isFilter : boolean = false;
  matchoption: string = "all"; // 'all' or 'one'; default: 'all'
  applynewFilter; boolean = false; // an new  filter has to apply

  constructor(private http: HttpClient) {}

  getResult(queryold: string, querynew: string, language: string): void{
    // reset all variables
    this.loading = true; // for spinner in query.componente
    this.serverdata = {outputList: [], duration: '', changesnumber: ''};
    this.noChanges = false;
    this.errorMessage = '';
    // new search
    this.setnewSearch(true);
    this.language = language;
    this.getQueryResult(queryold, querynew, language)
    .subscribe(rd => {
      this.loading = false; // for spinner in query.componente
      if (rd != null) {
        this.serverdata = rd;
        this.setnewSearch(true);
        if (rd.outputList != null) {
          if (rd.outputList.length === 0) {
            this.noChanges = true;
          } else if ((rd.outputList.length === 1) &&
              // ((rd.outputList[0].query.length == 0) ||
              ((rd.outputList[0].o === 'invalid query') ||
              (rd.outputList[0].n === 'invalid query'))){
            this.errorMessage = "Invalid query, try again."  // message in outputList[0]
            this.serverdata.outputList.pop(); // remove the error message from outputList
          }
        } else {
          this.errorMessage = "Couldn't query the DiffSearch server or an undefined response was received."
        }
      } else {
        this.loading = false;  // for spinner in query.componente
        this.errorMessage = "Couldn't query the DiffSearch server or an undefined response was received."
      }
    });

    // this.getQueryResult(queryold, querynew)
    //  .subscribe(rd => {this.resultdata = rd;});
     // console.log ('url ' + this.resultdata[0].url);
  }

  getCodeChanges(): ResultData[] {
    return this.serverdata.outputList;
  }

  getQueryResult(oldquery: string, newquery: string, language: string): Observable<ServerData> {
    let url = this.queryUrl;
    if (url.indexOf ('localhost') < 0) {
      // production mode
      // activate the code below if the Apache server on soladif
      // has been reconfigured (api_java, api_javascript, api_python)
      //
      // *** from here ***
      if (language == 'Java') {
         url = url + "_java";
      } else if (language == 'JavaScript') {
         url = url + "_javascript";
      } else if (language == 'Python') {
         url = url + "_python";
      } else { // default
         url = url + "_java";
      }
      // *** to here ***
    } else {
      // development mode
      if (language == 'Java') {
        url = "http://localhost:8843";
      } else if (language == 'JavaScript') {
        url = "http://localhost:8845";
      } else if (language == 'Python') {
        url = "http://localhost:8844";
      } else { // default
        url = "http://localhost:8843";
      }
    }
    const params = new HttpParams().set('Text1', oldquery).set('Text2', newquery).set('Language', language);
    // return this.http.get<ServerData>(this.queryUrl, {params})
    return this.http.get<ServerData>(url, {params})
      .pipe(
        catchError(this.handleError<ServerData>('getQeryResult')));
  }

  private handleError<T>(operation = 'operation', result?: T): any|Observable<T>{
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // this.errorMessage = error;
      this.errorMessage = "Couldn't query the DiffSearch server or an undefined response was received.";

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  setQeryString(oldQ: string, newQ: string) {
    this.oldquery = oldQ;
    this.newquery = newQ;
  }

  setnewSearch (flag: boolean) {
    this.newSearch = flag;
  }

  isnewSearch(): boolean {
    return this.newSearch;
  }

  getloading(): boolean {
    return this.loading;
  }

  // Filter
  setFilterData(fd: Filter[]) {
    this.filterdata = fd;
  }

  resetFilterdata() {
    this.filterdata = [];
  }

  setisFilter() {
    this.isFilter = true;
  }

  resetisFilter() {
    this.isFilter = false;
  }
}

export interface ServerData {
  outputList: ResultData[];
  duration: string;
  changesnumber: string;
}

export interface Filter {
  key: string;
  name: string;
  changed : boolean;
  placeholder: string;
  data : string;
  option: string
}

export interface Option {
  value: string;
  text: string;
}
