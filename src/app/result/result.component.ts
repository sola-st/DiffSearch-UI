// import { Component, OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
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

export class ResultComponent implements AfterViewInit {
  displayedColumns: string[] = ['old', 'arrow', 'new', 'link'];
  //  dataSource = new MatTableDataSource<ResultData>(ELEMENT_DATA);
  codechanges: ResultData[] = [];
  dataSource = new MatTableDataSource<ResultData>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private queryService: QueryService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getData() {
    this.codechanges = this.queryService.getCodeChanges();
    this.dataSource = new MatTableDataSource<ResultData>(this.codechanges);
    // console.log ("in getData");
    // console.log (this.dataSource.data);
    return this.dataSource;
  }
}

// example data
const ELEMENT_DATA: ResultData[] = [
  {url: 'https://github.com/quarkusio/quarkus/commit/8b3d76af5e8f056334cc6ca39b78b90eedd8136a',
  hunk_lines: '-120,15 +120,15',
  codeChange_old: 'assertEquals(numberOfSegments,2);',
  codeChange_new: 'assertEquals(2,numberOfSegments);'},
  {url: 'https://github.com/quarkusio/quarkus/commit/1c89c51f6626fed09d594ea69289da13736d613b',
  hunk_lines: '-0,0 +1,34',
  codeChange_old: 'assertFalse(deployed,\"Shouldnotdeployinvalidrule\");',
  codeChange_new: 'assertFalse(\"Shouldnotdeployinvalidrule\",deployed);'}
];
