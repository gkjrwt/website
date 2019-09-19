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

  getVersions() {
    return this.httpClient.get(`/documentation/version-list.json`);
  }

  getVersionGroups(version: string) {
    return this.httpClient.get(`/documentation/${version}.json`);
  }
}