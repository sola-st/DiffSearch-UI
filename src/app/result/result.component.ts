
import {AfterViewInit, Component, ViewChild, OnInit,  AfterViewChecked} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";


import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ResultData} from '../resultdata';
import {QueryService} from '../query.service';
import {ChangeDetectorRef} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

import {js_beautify} from "js-beautify";

declare const PR: any;

@Component({
  selector: 'ds-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['minus', 'old', 'arrow', 'plus','new', 'link'];
  displayedColumnsMobile: string[] = ['code'];
  private codechanges: ResultData[] = [];

  duration = '';
  changesnumber = '';
  tablesize = 0;

  dataSource = new MatTableDataSource<ResultData>(this.codechanges);

  public isMobile = false;

  // readonly GITHUB= 'https://github.com/';

  // for download JSON file
  private downloadUrl: SafeUrl;
  private blobUrl: string;
  private fileName = "diffsearch";

  // Filter
  filterValues = {};
  ignoredFilterKeys: string = ""; // keys in result data list
                                  // for which no information exist

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private queryService: QueryService,
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef,
    private sanitizer: DomSanitizer)  {
      breakpointObserver.observe([
        Breakpoints.XSmall
      ]).subscribe(result => {
        this.isMobile = result.matches;
      });
    }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.codechanges = this.queryService.getCodeChanges();
    this.duration = this.queryService.serverdata.duration;
    this.changesnumber = this.formatNumber
      (this.queryService.serverdata.changesnumber);
    this.dataSource.data = this.codechanges;
    this.tablesize = this.dataSource.data.length;
    this.dataSource.filterPredicate = this.createFilter();
    this.tablesize = this.dataSource.paginator.length;
  }

  public ngAfterViewChecked(): any {
    PR.prettyPrint();
    this.tablesize = this.dataSource.paginator.length;
    this.cd.detectChanges();
  }

  ngOnInit () {

  }

  getData(): MatTableDataSource<ResultData> {
    // Is this a new search?
    if (this.queryService.isnewSearch()) {
      this.codechanges = this.queryService.getCodeChanges();
      // set the duration and changes number
      // reset the new search flag
      this.duration = this.queryService.serverdata.duration;
      this.changesnumber = this.formatNumber
        (this.queryService.serverdata.changesnumber);
      this.dataSource.data = this.codechanges;

      // there are filters that need to be ignored,
      // because there is no information for them in the result list
      let codechange: ResultData;
      let numberFilters = this.queryService.filterdata.length;
      let filterkeys : number[] = []; // to test if all codechanges do not contain data for filter key
      this.ignoredFilterKeys = "";  // reset the ignored filterkeys
      for (let i=0; i<numberFilters; i++){
        filterkeys[i] = 0;
        for (let k=0; k<this.dataSource.data.length; k++)  {
          codechange = this.dataSource.data[k];
          if ((codechange[this.queryService.filterdata[i].key] == "")
	    || (codechange[this.queryService.filterdata[i].key] == null)){
            filterkeys[i]++;  // test of 'no info' in codechange
          } else {
            break;
          }
        }
      }
      filterkeys.forEach((value, index) => {
        if ((value > 0) && (value == this.codechanges.length)) { // all codechanges have 'no info' for this key
          if ( this.ignoredFilterKeys.length > 0) {
            this.ignoredFilterKeys += "$" + this.queryService.filterdata[index].key;
          } else {
            this.ignoredFilterKeys += this.queryService.filterdata[index].key;
          }
        }
      });
      if (this.queryService.isFilter) {
        this.applyFilter();
      }

      this.tablesize = this.dataSource.data.length;

      // reset the new search flag
      this.queryService.setnewSearch(false);

      // generate Blob URL
      this.generateUrl();
    }

    // Was 'apply filter to search result' clicked in the query component
    if (this.queryService.applynewFilter) {
      this.applyFilter();
      this.queryService.applynewFilter = false;
      this.tablesize = this.dataSource.paginator.length;
    }
    // filter warning if necessary
    if (this.queryService.isFilter) {
      let splitted = this.ignoredFilterKeys.split("$");
      let msg = '';
      let n = 0;
      splitted.forEach((value) => {
        this.queryService.filterdata.forEach((v, i) => {
	  if ((value == v.key) && (v.data != '')) { // filter is set
            msg = msg + "'" + v.name + "'";
	    n++;
          }
        });
      });
      if (n > 0) {
        if (n > 1) {
          msg = 'Due to missing information in result data the following filters are ignored: ' + msg;
        } else {
          msg = 'Due to missing information in result data the following filter is ignored: ' + msg;
        }
      }
      this.queryService.errorMessage = msg;
    }

    return this.dataSource;
  }

  beautify(resultString: string): string {
    let lineLength = 50;
    let breakchainedMethods = false;

    if (this.isMobile) {
      lineLength = 40;
      breakchainedMethods = true;
    } else {
      if (resultString.length > 50) {
        breakchainedMethods = true;
      }
    }

    // if ((this.queryService.language == 'Java') || (this.queryService.language == 'JavaScript')) {
      // use js_beautifiy for all languages (for python it is not optimal (but better than no formatting))
      return js_beautify(resultString,
        { indent_size: 2,
          wrap_line_length: lineLength,
          brace_style: "collapse",
          break_chained_methods: breakchainedMethods
        });
    // }

    return resultString;
  }

  // computeUrl (commit: string, project: string): string {
  //   // compute the url to GitHub
  //   return this.GITHUB + project.replace(".","/") + "/commit/" + commit;
  // }

  formatNumber (n: string): string {
    return n.replace(/(.)(?=(\d{3})+$)/g,'$1,');
  }


  getTooltip (filenameOld: string, lineOld: string,
    filenameNew: string, lineNew: string): string {
    if (filenameNew == null) {
      return filenameOld + ": -" + lineOld + "," + "+" + lineNew;
    }
    return filenameOld + ": -" + lineOld + "," + filenameNew + ": +" + lineNew;
  }

  getErrorMessage(): string {
    return this.queryService.errorMessage;
  }

  emptyResult(): boolean {
    return this.queryService.noChanges;
  }

  generateUrl() {
    // Revokes the previous URL object, if any
    if (this.blobUrl) {
      window.URL.revokeObjectURL(this.blobUrl);
      this.blobUrl = undefined;
    }
    //let res = this.codechanges;
    let res = this.dataSource.filteredData; // get only the filtered data
    this.fileName = "diffsearch.json";

    let data = JSON.stringify(res);
    const bytes = new TextEncoder().encode(data);

    let blob = new Blob([bytes], { type: 'application/json'});
    this.blobUrl= window.URL.createObjectURL(blob);
    let uri:SafeUrl = this.sanitizer.bypassSecurityTrustUrl(this.blobUrl);
    this.downloadUrl = uri;
  }

  ngOnDestroy() {
    // Revokes the URL object
    if(this.blobUrl) { window.URL.revokeObjectURL(this.blobUrl); }
  }

  applyFilter() {
    // reset filter values
    for (const key in this.filterValues) {
      delete this.filterValues[key];
    }

    for (let i=0; i<this.queryService.filterdata.length; i++) {
      if (!this.ignoredFilterKeys.split('$').includes(this.queryService.filterdata[i].key)) {
        if (this.queryService.isFilter) {
          this.filterValues[this.queryService.filterdata[i].key] = this.queryService.filterdata[i].data.trim().toLowerCase();
          this.filterValues[this.queryService.filterdata[i].key + 'opt$'] = this.queryService.filterdata[i].option.trim().toLowerCase();
        } else {
          this.filterValues[this.queryService.filterdata[i].key] = "";
          this.filterValues[this.queryService.filterdata[i].key + 'opt$'] = "";
        }
      }
    }
    this.filterValues['matchoption'] = this.queryService.matchoption;
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

  // Get Uniqu values from columns to build filter
  getFilterObject(fullObj, key) {
    const uniqChk = [];
    fullObj.filter((obj) => {
      if (!uniqChk.includes(obj[key])) {
        uniqChk.push(obj[key]);
      }
      return obj;
    });
    return uniqChk;
  }

  // Custom filter method fot Angular Material Datatable
  createFilter() {
    //let negations: Array<string> = [];
    let filterFunction = function (data: any, filter: string): boolean {
      let negations: Array<string> = [];
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      let moption = "all"; // default
      for (const col in searchTerms) {
        if (col.startsWith('matchoption')) {
          moption = searchTerms[col].toString();
          delete searchTerms[col];
        } else {
          if (!col.endsWith('opt$')) {
            if ((searchTerms[col].toString() !== '')) {
              isFilterSet = true;
            } else {
              delete searchTerms[col];
            }
          } else {
            if (searchTerms[col].toString().startsWith('not')) {
              negations.push(col.substring(0, col.lastIndexOf('opt$')));
            }
            delete searchTerms[col];
          }
	}
      }

      let nameSearch = () => {
        let found = false;
        if (isFilterSet) {
          for (const col in searchTerms) {
	    if (moption == 'all') { // reset found
              found = false;
            }
            if (data[col].toString().toLowerCase().indexOf(searchTerms[col])
	      != -1 && isFilterSet) {
              found = true;
            }
            if (negations.indexOf(col) != -1) { // col in negations -> negate the search result
              found = !found;
            }
	    if (!found && (moption=='all')) {  // all filters must be true
	      break;
            }

            if (found && (moption=='one')) { // one filters must be true
              break;
            }
          }
          return found;
        } else {
          return true;
        }
      }
      return nameSearch();
    }
    return filterFunction;
  }
}

// example data
const ELEMENT_DATA: ResultData[] = [
  {c: 'https://github.com/quarkusio/quarkus/commit/8b3d76af5e8f056334cc6ca39b78b90eedd8136a',
  cm: 'commit1',
  o: 'assertEquals(numberOfSegments,2);',
  n: 'assertEquals(2,numberOfSegments);',
  // query: '',
  p : '',
  fn: '',
  f: '',
  l: 0,
  lN: 0},
  //numberOfCandidateChanges: 0},
  {c: 'https://github.com/quarkusio/quarkus/commit/1c89c51f6626fed09d594ea69289da13736d613b',
  cm: 'commit2',
  o: 'assertFalse(deployed,\"Shouldnotdeployinvalidrule\");',
  n: 'assertFalse(\"Shouldnotdeployinvalidrule\",deployed);',
  // query: '',
  p : '',
  fn: '',
  f: '',
  l: 0,
  lN: 0}
  // numberOfCandidateChanges: 0}
];
