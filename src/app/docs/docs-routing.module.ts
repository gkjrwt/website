import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocsComponent } from './docs.component';
import { DocsResolver } from './docs.resolver';

const routes: Routes = [
  { path: 'docs', component: DocsComponent, resolve: { docsList: DocsResolver } },
  { path: 'docs/:fwLanguage', component: DocsComponent, resolve: { docsList: DocsResolver } },
  { path: 'docs/:fwLanguage/:version', component: DocsComponent, resolve: { docsList: DocsResolver } },
  { path: 'docs/:fwLanguage/:version/:topic', component: DocsComponent, resolve: { docsList: DocsResolver } },
  { path: '**', component: DocsComponent, resolve: { docsList: DocsResolver } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class DocsRoutingModule { }
