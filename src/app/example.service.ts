import { Injectable } from '@angular/core';
import { Example, EXAMPLES_JAVA, EXAMPLES_JAVASCRIPT, EXAMPLES_PYTHON } from './examples';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  examples: Example[] = EXAMPLES_JAVA;  // default: Java

  constructor() { }

  getExamples(language: string): Example[] {
    if (language == 'JavaScript') {
      this.examples = EXAMPLES_JAVASCRIPT;
    } else if (language == 'Python') {
      this.examples = EXAMPLES_PYTHON;
    } else  {
      this.examples = EXAMPLES_JAVA;
    }
    return this.examples;
  }
}
