import { Component, OnInit} from '@angular/core';
// import { Directive, Input, Component, OnInit } from '@angular/core';
import { ExampleService } from '../example.service';
import { Example } from '../examples';

import { QueryService } from '../query.service';
import { BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Grammar, GRAMMAR} from '../grammar';

@Component({
  selector: 'ds-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})


export class QueryComponent implements OnInit {
  selectedLanguage: string;
  languages: string[] = ['Java', 'JavaScript', 'Python'];
  // public selection: string;

  public isMobile = false;

  examples: Example[] = [];
  oldcontent: string = '';
  newcontent: string = '';

  public showGrammar = false;
  public info: any = 'Show';
  querygrammar: Grammar[] = GRAMMAR;

  constructor(
    private exampleService: ExampleService,
    private queryService: QueryService,
    private breakpointObserver: BreakpointObserver) {
  // constructor(private grid: MatGridList, private breakpointObserver: BreakpointObserver,
  //   private exampleService: ExampleService, private queryService: QueryService) {
    breakpointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  ngAfterViewInit() {
    // empty or saved strings
    this.oldcontent = this.queryService.oldquery;
    this.newcontent = this.queryService.newquery;
  }

  ngOnInit(): void {
    this.selectedLanguage = 'Java';
    this.examples = this.exampleService.getExamples(this.selectedLanguage);
  }

  onExampleClick(n: number): void {
    this.oldcontent = this.examples[n].old;
    this.newcontent = this.examples[n].new;
  }

  autoGrowTextZone(e): void {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25)+"px";
  }

  onSearchClick(oldstring: string, newstring: string, language: string): void {
    // save the query string for re-route
    this.queryService.setQeryString(oldstring, newstring);

    this.queryService.getResult(oldstring.trim(), newstring.trim(), language);
  }

  toggle(): void {
    this.showGrammar = !this.showGrammar;

    // change the tooltip info
    if (this.showGrammar) {
      this.info = 'Hide';
    }
    else {
      this.info = 'Show';
    }
  }

  getloading(): boolean {
    return this.queryService.loading;
  }

  radioButtonchanged() {
    this.examples = this.exampleService.getExamples(this.selectedLanguage);
    this.oldcontent = '';
    this.newcontent = '';
  }
}
