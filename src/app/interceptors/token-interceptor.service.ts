import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // If we have not yet set the Content-Type header
    if (!req.headers.has('Content-Type')) {
      // Then add our default
      req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
    }

    // Set the accept header on all requests
    req = req.clone({headers: req.headers.set('Accept', 'application/json')});

    return next.handle(req).do((ev: HttpEvent<any>) => {
      if (ev instanceof HttpResponse) {
        // Here we can do stuff with the response if we want
        return ev;
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        return Observable.throw(err);
      }
    });
  }
}
