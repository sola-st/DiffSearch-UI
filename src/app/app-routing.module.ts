import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiffsearchComponent } from './diffsearch/diffsearch.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'diffsearch', component: DiffsearchComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: 'diffsearch', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
