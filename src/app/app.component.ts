import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'ds-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'diffsearch';

  public isMobile = false;

  constructor(@Inject(DOCUMENT) private document: Document, private breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  // currently not used
  toggleTheme(): void {
    this.document.body.classList.toggle('dark-theme');
  }
}
