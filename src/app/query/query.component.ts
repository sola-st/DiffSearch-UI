import { Component, NgZone, ViewChild, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { CdkTextareaAutosize} from '@angular/cdk/text-field';
// import { Directive, Input, Component, OnInit } from '@angular/core';
import { ExampleService } from '../example.service';
import { Example } from '../examples';

import { QueryService, Option, Filter } from '../query.service';
import { Grammar, GRAMMAR} from '../grammar';

@Component({
  selector: 'ds-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})


export class QueryComponent implements OnInit {
  selectedLanguage: string;
  languages: string[] = ['Java', 'JavaScript', 'Python'];

  public isMobile = false;

  examples: Example[] = [];
  oldcontent: string = '';
  newcontent: string = '';

  // Filter Section:
  showFilter: boolean = false;   // should display the filter information
  filterinfo: string = "";

  // Filter Table
  filterColumns: string[] = ['name', 'data'];
  filterColumnsmobile: string[] =['mdata'];
  options: Option[];
  dataFilters: Filter[];
  savedFilterInfo: Filter[];  // saved filter info for apply filter
  apply: boolean = false;
  savedmoption: string;

  // Grammar Section
  public showGrammar = false;
  public info: any = 'Show';
  querygrammar: Grammar[] = GRAMMAR;

  constructor(
    private exampleService: ExampleService,
    private queryService: QueryService,
    private breakpointObserver: BreakpointObserver,
    private _ngZone: NgZone) {
    breakpointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  ngAfterViewInit() {
    // empty or saved strings
    this.oldcontent = this.queryService.oldquery;
    this.newcontent = this.queryService.newquery;

    this.options = this.queryService.options;
    this.dataFilters = this.queryService.filterdata;
    this.savedFilterInfo = this.dataFilters.map(obj => ({...obj}));
    this.savedmoption = this.queryService.matchoption;
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
    // filter set?
    if (this.filterinfo.length > 0) {
      this.queryService.setisFilter();
      this.queryService.setFilterData(this.dataFilters);
    } else {
      this.queryService.resetisFilter();
      this.queryService.resetFilterdata;
    }
    // reset the change Information
    this.dataFilters[0].changed = false;
    this.dataFilters[1].changed = false;

    this.setfilterInfo();
    // saved filter info for apply filter
    this.savedFilterInfo = this.dataFilters.map(obj => ({...obj}));
    this.savedmoption = this.queryService.matchoption;
    this.apply = false;

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

  setfilterInfo(): void {
    this.apply = false;
     let set = 0;
     let changes = 0;
     for (let i=0; i<this.dataFilters.length; i++) {
      if (this.dataFilters[i].changed) {
        changes++;
      }
      if (this.dataFilters[i].data.length > 0) {
         set++;
       }
      this.filterinfo = "";
      if (changes > 0 ) { // not applied
        this.filterinfo = "(set: " + set + ")";
        this.apply = true;
      } else { // applied
        if (set > 0) {
           this.filterinfo = "(set: " + set + " (applied))";
        }
      }
      if (!this.queryService.matchoption.includes(this.savedmoption)
        && (set > 0)) {
        this.filterinfo = "(set: " + set + ")";
        this.apply = true;
      }
    }
  }

  toggleFilter(): void {
    this.showFilter = !this.showFilter;
    this.setfilterInfo();
  }

  getloading(): boolean {
    return this.queryService.loading;
  }

  radioButtonchanged() {
    this.examples = this.exampleService.getExamples(this.selectedLanguage);
    this.oldcontent = '';
    this.newcontent = '';
  }

  registerChange() {
    for (let i=0; i<this.dataFilters.length; i++) {
      // reset the changed information
      this.dataFilters[i].changed = false;
      if (!(this.dataFilters[i].data === this.savedFilterInfo[i].data)) {
        this.dataFilters[i].changed = true;
      } else {  // only the option has changed and the data is not empty
        if ((!(this.dataFilters[i].option === this.savedFilterInfo[i].option))
        && this.dataFilters[i].data.length > 0) {
          this.dataFilters[i].changed = true;
        }
      }
    }
    this.setfilterInfo();
  }

  optionChanged(row: Filter) {
    this.registerChange();
  }

  matchoptionChanged(option) {
    this.queryService.matchoption = option;
    this.setfilterInfo();
  }

  applyFilterClicked() {
    // filter set?
    if (this.filterinfo.length > 0) {
      this.queryService.setisFilter();
      this.queryService.setFilterData(this.dataFilters)
    } else {
      this.queryService.resetisFilter();
      this.queryService.resetFilterdata;
    }
    this.queryService.applynewFilter = true;

    // reset the changed information
    this.dataFilters[0].changed = false;
    this.dataFilters[1].changed = false;

    this.setfilterInfo();
    this.savedFilterInfo = this.dataFilters.map(obj => ({...obj}));
    this.savedmoption = this.queryService.matchoption;
    this.apply = false;
  }
}
