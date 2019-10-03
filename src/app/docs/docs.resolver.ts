import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DocsService } from './docs.service';

@Injectable()
export class DocsResolver implements Resolve<{}> {
  constructor(private docsService: DocsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): {} | Observable<{}> | Promise<{}> | any {
    return this.docsService.getDocsList();
  }
}