import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {IHlsStream} from '../models/hls-stream.interface';

@Injectable()
export class MediaElementService {

  constructor(private http: HttpClient) { }

  createStream(url): Observable<IHlsStream> {
    const path = '/hls';

    return this.http
      .post<IHlsStream>(environment.node_url + path, JSON.stringify({ url: encodeURI(url)}));
  }
}
