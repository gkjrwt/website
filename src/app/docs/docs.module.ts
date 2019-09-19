import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsComponent } from './docs.component';
import { MarkdownModule } from 'ngx-markdown';
import { DocsRoutingModule } from './docs-routing.module';



@NgModule({
  declarations: [DocsComponent],
  imports: [
    CommonModule,
    MarkdownModule.forRoot(),
    DocsRoutingModule
  ],
  entryComponents: [DocsComponent]
})
export class DocsModule { }
