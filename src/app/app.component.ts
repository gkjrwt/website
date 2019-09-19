import { Component } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { DocsService } from './docs.service';

const rgxMarkdownComments = new RegExp(/<!--([a-zA-Z:\-\n ]+)-->/);
const rgxMarkdownSections = new RegExp(/section:([a-zA-Z\-]+):([a-zA-Z ]+)/g);

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
  docsGroups: any[];
  currentDocsVersion: string;
  docTopicSections = [];
  docTopicLink: string;

  constructor(docsService: DocsService) {
    this.docsService = docsService;

    this.docsService.getVersions().subscribe(data => {
      this.docsVersions = <any>data;
      this.currentDocsVersion = this.docsVersions[0];
      this.docsService.getVersionGroups(this.currentDocsVersion).subscribe(data => {
        this.docsGroups = <any>data;
        this.docTopicLink = this.docsGroups[0].topics[0].link;
      });
    });
  }

  changeDocsVersion(version: string) {
    this.docsService.getVersionGroups(version).subscribe(data => {
      this.currentDocsVersion = version;
      this.docsGroups = <any>data;
    });
  }

  onMDLoad(event: string) {
    const matched = event.match(rgxMarkdownComments);

    if(matched) {
      const comments = matched[1];
      let rgxRes;

      while((rgxRes = rgxMarkdownSections.exec(comments)) !== null) {
        this.docTopicSections.push({
          id: rgxRes[1],
          name: rgxRes[2]
        });
      }
    }
  }

  onMDError(event) {

  }

  changeDocsTopic(topicLink) {
    this.docTopicLink = topicLink;
  }

  ngOnInit() {
    new PerfectScrollbar('#left-sidebar', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    });

    new PerfectScrollbar('#right-sidebar', {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    });
  }
}







