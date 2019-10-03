import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class DocsService {

  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getVersions(language: string) {
    const url = environment.docsServer.versionList
      .replace('{language}', language.toLowerCase());

    return this.httpClient.get(url);
  }

  getVersionGroups(language: string, version: string) {
    const url: string = environment.docsServer.versionGroup
      .replace('{language}', language.toLowerCase())
      .replace('{version}', version);

    return this.httpClient.get(url);
  }

  getDocsList() {
    return this.httpClient.get(environment.docsServer.docsList);
  }
}