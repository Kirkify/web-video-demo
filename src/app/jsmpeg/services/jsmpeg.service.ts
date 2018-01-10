import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IJsmpeg } from '../models/jsmpeg.interface';

@Injectable()
export class JsmpegService {

  constructor(private http: HttpClient) { }

  createStream(url): Observable<IJsmpeg> {
    const path = '/jsmpeg';

    return this.http
      .post<IJsmpeg>(environment.node_url + path, JSON.stringify({ url: encodeURI(url)}));
  }

}
