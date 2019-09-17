import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class DocsService {

  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  getDocsVersions() {
    return this.httpClient.get(`http://localhost:5000/docs-versions.json`);
  }

  getDocsList(version: string) {
    return this.httpClient.get(`http://localhost:5000/${version}.json`);
  }
}