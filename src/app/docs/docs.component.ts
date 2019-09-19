import { Component, OnInit } from '@angular/core';
import { DocsService } from './docs.service';
import PerfectScrollbar from 'perfect-scrollbar';


const rgxMarkdownComments = new RegExp(/<!--([a-zA-Z:\-\n ]+)-->/);
const rgxMarkdownSections = new RegExp(/section:([a-zA-Z\-]+):([a-zA-Z ]+)/g);

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
  providers: [DocsService]
})
export class DocsComponent implements OnInit {

  private docsService: DocsService;

  docsVersions: string[];
  docsGroups: any[];
  currentDocsVersion: string;
  docTopicSections = [];
  docTopicLink: string;
  frameworkLanguages: string[];
  frameworkLanguage: string;

  constructor(docsService: DocsService) {
    this.docsService = docsService;
    this.frameworkLanguages = [ 'Typescript', 'Javascript' ];
    this.frameworkLanguage = this.frameworkLanguages[0];
    this.populateDocs(this.frameworkLanguage);
  }

  populateDocs(language: string) {
    this.docsService.getVersions(language).subscribe(data => {
      this.frameworkLanguage = language;
      this.docsVersions = <any>data;
      this.currentDocsVersion = this.docsVersions[0];
      this.docsService.getVersionGroups(this.frameworkLanguage, this.currentDocsVersion).subscribe(data => {
        this.docsGroups = <any>data;
        this.docTopicLink = this.docsGroups[0].topics[0].link;
      });
    });
  }

  changeDocsVersion(version: string) {
    this.docsService.getVersionGroups(this.frameworkLanguage, version).subscribe(data => {
      this.currentDocsVersion = version;
      this.docsGroups = <any>data;
    });
  }

  onMDLoad(event: string) {
    const matched = event.match(rgxMarkdownComments);

    if(matched) {
      const comments = matched[1];
      let rgxRes;

      this.docTopicSections = [];

      while((rgxRes = rgxMarkdownSections.exec(comments)) !== null) {
        this.docTopicSections.push({
          id: rgxRes[1],
          name: rgxRes[2]
        });
      }
    }
  }

  onMDError(event) {}

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
