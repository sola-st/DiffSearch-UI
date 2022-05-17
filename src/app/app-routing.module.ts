import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiffsearchComponent } from './diffsearch/diffsearch.component';
import { AboutComponent } from './about/about.component';
import { SourceComponent } from './source/source.component';

const routes: Routes = [
  { path: 'diffsearch', component: DiffsearchComponent },
  { path: 'about', component: AboutComponent },
  // { path: 'source', component: SourceComponent },
  { path: '', redirectTo: 'diffsearch', pathMatch: 'full' },
  { path: '**', redirectTo: 'diffsearch'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
