import { Component } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { DocsService } from './docs.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DocsService]
})
export class AppComponent {
  title = 'NodeArch';

  private docsService: DocsService;

  docsVersions: string[];
  docsList: any[];
  currentDocsVersion: string;


  constructor(docsService: DocsService) {
    this.docsService = docsService;

    this.docsService.getDocsVersions().subscribe(data => {
      this.docsVersions = <any>data;
      this.currentDocsVersion = this.docsVersions[0];
      this.docsService.getDocsList(this.currentDocsVersion).subscribe(data => {
        this.docsList = <any>data;
      });
    });
  }

  changeDocsVersion(version: string) {
    this.docsService.getDocsList(version).subscribe(data => {
      this.currentDocsVersion = version;
      this.docsList = <any>data;
    });
  }

  ngOnInit() {
    new PerfectScrollbar('#sidenav', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    });
  }
}







