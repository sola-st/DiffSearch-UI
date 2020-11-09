import { Injectable } from '@angular/core';
import { Example, EXAMPLES } from './examples';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  examples: Example[] = EXAMPLES;

  constructor() { }

  getExamples(): Example[] {
    return this.examples;
  }
}
