import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../example.service';
import { Example } from '../examples';

import { QueryService } from '../query.service';

@Component({
  selector: 'ds-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {
  selectedLanguage: string;
  languages: string[] = ['Java', 'JavaScript', 'Python'];
  public selection: string;

  public customOption = 'customOption';

  examples: Example[] = [];
  oldcontent: string;
  newcontent: string;

  constructor(private exampleService: ExampleService, private queryService: QueryService) { }

  ngOnInit(): void {
    this.selectedLanguage = 'Java';
    this.examples = this.exampleService.getExamples();
  }

  onExampleClick(n: number): void {
    // console.log (n);
    this.oldcontent = this.examples[n].old;
    this.newcontent = this.examples[n].new;
  }

  onSearchClick(oldstring: string, newstring: string): void {
    this.queryService.getResult(oldstring, newstring);
  }

}
