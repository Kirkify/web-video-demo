import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/shareReplay';

export interface INavLink {
  route: string;
  name: string;
  icon: string;
}

@Injectable()
export class NavLinkService {
  dataStore = {
    links: [
      {
        route: 'jsmpeg',
        name: 'JsMpeg',
        icon: 'gesture'
      },
      {
        route: 'media-element',
        name: 'Media Element',
        icon: 'toys'
      }
    ] as INavLink[]
  };
  _linkSubject = new BehaviorSubject<INavLink[]>(this.dataStore.links);

  constructor() {
  }

  getLinks(): Observable<INavLink[]> {
    return this._linkSubject.asObservable().shareReplay();
  }

  addLink(link: INavLink) {
    this.dataStore.links.unshift(link);
    this._linkSubject.next(Object.assign({}, this.dataStore).links);
  }
}
