// import { Component, OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ResultData} from '../resultdata';
import { QueryService } from '../query.service';
// import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'ds-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})

export class ResultComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['old', 'arrow', 'new', 'link'];
  codechanges: ResultData[] = [];

  duration = '';
  changesnumber = '';
  tablesize = 0;

  dataSource = new MatTableDataSource<ResultData>(this.codechanges);

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private queryService: QueryService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.codechanges = this.queryService.getCodeChanges();
    this.duration = this.queryService.serverdata.duration;
    this.changesnumber = this.queryService.serverdata.changesnumber;
    this.dataSource.data = this.codechanges;
    this.tablesize = this.dataSource.data.length;
  }

  ngOnInit () {

  }

  getData(): MatTableDataSource<ResultData> {
    //console.log (this.queryService.getCodeChanges());
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

  getErrorMessage(): string {
    return this.queryService.errorMessage;
  }

  emptyResult(): boolean {
    return this.queryService.noChanges;
  }
}

// example data
const ELEMENT_DATA: ResultData[] = [
  {url: 'https://github.com/quarkusio/quarkus/commit/8b3d76af5e8f056334cc6ca39b78b90eedd8136a',
  hunkLines: '-120,15 +120,15',
  codeChangeOld: 'assertEquals(numberOfSegments,2);',
  codeChangeNew: 'assertEquals(2,numberOfSegments);',
  query: '',
  fullChangeString: '',
  rank: 0,
  numberOfCandidateChanges: 0},
  {url: 'https://github.com/quarkusio/quarkus/commit/1c89c51f6626fed09d594ea69289da13736d613b',
  hunkLines: '-0,0 +1,34',
  codeChangeOld: 'assertFalse(deployed,\"Shouldnotdeployinvalidrule\");',
  codeChangeNew: 'assertFalse(\"Shouldnotdeployinvalidrule\",deployed);',
  query: '',
  fullChangeString: '',
  rank: 0,
  numberOfCandidateChanges: 0}
];
