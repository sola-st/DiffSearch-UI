import { Component, Inject  } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'ds-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  isShow = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    isMobile = false;

  constructor(private breakpointObserver: BreakpointObserver, @Inject(DOCUMENT) private document: Document) {
    breakpointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe(result => {
      this.isMobile = result.matches;
    });
  }
  // constructor(private breakpointObserver: BreakpointObserver) {}

  toggleTheme(): void {
    this.document.body.classList.toggle('dark-theme');
  }

}
