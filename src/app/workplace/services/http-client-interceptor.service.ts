import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'any'
})
export class HttpClientInterceptorService {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    if (!environment.production) {
      request = req.clone({headers: req.headers.set('Authorization', 'Basic YWRtaW46YWRtaW4=')});
    }
    return next.handle(request);
  }
}
