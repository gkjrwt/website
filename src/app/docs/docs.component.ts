import { Component, OnInit } from '@angular/core';
import { DocsService } from './docs.service';
import PerfectScrollbar from 'perfect-scrollbar';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


const rgxMarkdownComments = new RegExp(/<!--([a-zA-Z:\-\n ]+)-->/);
const rgxMarkdownSections = new RegExp(/section:([a-zA-Z\-]+):([a-zA-Z ]+)/g);
const rgxextractSlug = new RegExp(/\/([A-Za-z-]+).md/g);

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
  providers: [DocsService]
})
export class DocsComponent implements OnInit {

  docsList: any;
  fwLangs: string[];
  fwVersions: string[];
  selectedFwLang: string;
  selectedFwVersion: string;
  docTopicSections: any[];
  docsGroups: any[];
  selectedTopic: any;
  docsBaseUrl: string;
  private readonly route: ActivatedRoute;
  private readonly router: Router;

  constructor(docsService: DocsService, route: ActivatedRoute, router: Router) {
    this.route = route;
    this.router = router;
    this.docsBaseUrl = environment.docsServer.docsBaseUrl;
  }

  ngOnInit() {
    this.initScroll();
    this.docsList = this.route.snapshot.data.docsList;
    this.fwLangs = Object.keys(this.docsList);
    this.createTopicsSlug();
    this.resolveURL();
  }

  onMDLoad(event: string) {
    const matched = event.match(rgxMarkdownComments);

    if (matched) {
      const comments = matched[1];
      let rgxRes;

      this.docTopicSections = [];

      while ((rgxRes = rgxMarkdownSections.exec(comments)) !== null) {
        this.docTopicSections.push({
          id: rgxRes[1],
          name: rgxRes[2]
        });
      }
    }
  }

  onMDError(event) { }

  initScroll() {
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

  resolveURL() {
    this.route.params
      .subscribe(params => {

        this.selectedFwLang = this.getFwLang(params.fwLanguage);

        if(!this.selectedFwLang) return;

        this.populateFwVersions();
        this.selectedFwVersion = this.getFwVersion(params.version);

        if(!this.selectedFwVersion) return;

        this.populateDocsGroups();
        this.selectedTopic = this.getFwTopic(params.topic);

      });
  }

  navigateToError() {
    this.router.navigate(['/'], { relativeTo: this.route });
  }

  getFwLang(lang: string) {
    if (lang) {
      return this.fwLangs.find(x => {
        return x.toLowerCase() === lang.toLowerCase();
      });
    }
    else {
      this.navigateDocs();
    }
  }

  getFwVersion(version: string) {
    if(version) {
      return this.fwVersions.find(x => {
        return x.toLowerCase() === version.toLowerCase();
      });
    }
    else {
      this.navigateDocs(this.selectedFwLang);
    }
  }

  getFwTopic(topic: string) {
    if(topic) {
      let fwTopic;

      this.docsGroups.forEach(group => {
        fwTopic = group.topics.find(t => {
          return t.slug.toLowerCase() === topic;
        });
      });

      return fwTopic;
    }
    else {
      this.navigateDocs(this.selectedFwLang, this.selectedFwVersion);
    }
  }

  getValidParams(params: any) {
    if (!params.fwLanguage) {
      return {};
    }
    else if (!params.version) {
      return {
        fwLanguage: params.fwLanguage
      };
    }
    else if(!params.topic) {
      return {
        fwLanguage: params.fwLanguage,
        version: params.version
      };
    }
    else {
      return {
        fwLanguage: params.fwLanguage,
        version: params.version,
        topic: params.topic
      };
    }
  }

  populateFwVersions() {
    console.log('this.docsList', this.docsList)
    console.log('this.selectedFwLang', this.selectedFwLang);
    this.fwVersions = Object.keys(this.docsList[this.selectedFwLang]);
  }

  populateDocsGroups() {
    this.docsGroups = this.docsList[this.selectedFwLang][this.selectedFwVersion];
  }

  createTopicsSlug() {
    for(const fwLangName in this.docsList) {
      const fwLang = this.docsList[fwLangName];

      for(const fwVersionName in fwLang) {
        const fwVersion = fwLang[fwVersionName];

        for(const groupName in fwVersion) {
          const group = fwVersion[groupName];

          group.topics.forEach(topic => {
            const res = (new RegExp(/\/([A-Za-z-]+).md/g)).exec(topic.link);
            topic.slug = res[1];
          });
        }
      }
    }
  }

  navigateDocs(lang?: string, version?: string, topic?: string) {
    let _lang, _version, _topic;

    if (lang) {
      _lang = lang;
    }
    else {
      _lang = this.fwLangs[0];
    }

    if (version) {
      _version = version;
    }
    else {
      _version = Object.keys(this.docsList[_lang])[0];
    }

    if (topic) {
      _topic = topic;
    }
    else {
      _topic = this.docsList[_lang][_version][0].topics[0].slug;
    }

    this.router.navigate(['/docs', _lang.toLowerCase(), _version, _topic], { relativeTo: this.route });
  }
}
