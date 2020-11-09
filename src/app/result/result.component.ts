// import { Component, OnInit } from '@angular/core';
import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {ResultData} from '../resultdata';

@Component({
  selector: 'ds-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})

export class ResultComponent implements AfterViewInit {
  displayedColumns: string[] = ['old', 'arrow', 'new', 'link'];
  // dataSource = new MatTableDataSource<ResultElement>(ELEMENT_DATA);
  // dataSource = new MatTableDataSource<ResultData>(ELEMENT_DATA);
  codechanges: ResultData[] = [];
  dataSource = new MatTableDataSource<ResultData>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

// example data
const ELEMENT_DATA: ResultData[] = [
  {url: 'https://github.com/quarkusio/quarkus/commit/8b3d76af5e8f056334cc6ca39b78b90eedd8136a',
  hunklines: '-120,15 +120,15',
  codechangesold: 'assertEquals(numberOfSegments,2);',
  codechangesnew: 'assertEquals(2,numberOfSegments);'},
  {url: 'https://github.com/quarkusio/quarkus/commit/1c89c51f6626fed09d594ea69289da13736d613b',
  hunklines: '-0,0 +1,34',
  codechangesold: 'assertFalse(deployed,\"Shouldnotdeployinvalidrule\");',
  codechangesnew: 'assertFalse(\"Shouldnotdeployinvalidrule\",deployed);'}
];
