import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'ds-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'diffsearch';

   constructor(@Inject(DOCUMENT) private document: Document) {}

  toggleTheme(): void {
    this.document.body.classList.toggle('dark-theme');
  }
}
