import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocsComponent } from './docs.component';
import { MarkdownModule } from 'ngx-markdown';
import { DocsRoutingModule } from './docs-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';



@NgModule({
  declarations: [DocsComponent],
  imports: [
    CommonModule,
    NgbModule,
    MarkdownModule.forRoot(),
    ScrollToModule.forRoot(),
    DocsRoutingModule
  ],
  entryComponents: [DocsComponent]
})
export class DocsModule { }
