import { ComponentFixture } from '@angular/core/testing';
// import { Component, OnInit } from '@angular/core';
// import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {AfterViewInit, Component, ViewChild, OnInit,  AfterViewChecked} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ResultData} from '../resultdata';
import { QueryService } from '../query.service';
// import { getLocaleDateFormat } from '@angular/common';

import { BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

import { js_beautify } from "js-beautify";

declare const PR: any;

@Component({
  selector: 'ds-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['minus', 'old', 'arrow', 'plus','new', 'link'];
  displayedColumnsMobile: string[] = ['code'];
  // displayedColumns: string[] = ['code'];
  codechanges: ResultData[] = [];

  duration = '';
  changesnumber = '';
  tablesize = 0;

  dataSource = new MatTableDataSource<ResultData>(this.codechanges);

  public isMobile = false;

  readonly GITHUB= 'https://github.com/';

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private queryService: QueryService,
    private breakpointObserver: BreakpointObserver)  {
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
    this.changesnumber = this.queryService.serverdata.changesnumber;
    this.dataSource.data = this.codechanges;
    this.tablesize = this.dataSource.data.length;
  }

  public ngAfterViewChecked(): any {
    PR.prettyPrint();
  }

  ngOnInit () {

  }

  getData(): MatTableDataSource<ResultData> {
    if (this.queryService.isnewSearch()) {
      this.codechanges = this.queryService.getCodeChanges();
      // set the duration and changes number
      // reset the new search flag
      this.duration = this.queryService.serverdata.duration;
      this.changesnumber = this.queryService.serverdata.changesnumber;
      this.dataSource.data = this.codechanges;
      this.tablesize = this.dataSource.data.length;

      // reset the new search flag
      this.queryService.setnewSearch(false);
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
}

// example data
const ELEMENT_DATA: ResultData[] = [
  {c: 'https://github.com/quarkusio/quarkus/commit/8b3d76af5e8f056334cc6ca39b78b90eedd8136a',
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
