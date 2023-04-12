import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../service/local-storage.service';
import { finalize, tap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private _service: LocalStorageService,
    private spinner: NgxSpinnerService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.show();
    const started = Date.now();
    let ok: string;
    const authToken = this._service.getToken;
    if (!authToken) {
      return next.handle(request).pipe(
        tap({
          next: (event) =>
            (ok = event instanceof HttpResponse ? 'succeeded' : ''),
          error: (error) => (ok = 'failed'),
        }),
        finalize(() => {
          this.spinner.hide();
          const elapsed = Date.now() - started;
          const msg = `${request.method} "${request.urlWithParams}"
                 ${ok} in ${elapsed} ms.`;
        })
      );
    }
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    return next.handle(request).pipe(
      tap({
        next: (event) =>
          (ok = event instanceof HttpResponse ? 'succeeded' : ''),
        error: (error) => (ok = 'failed'),
      }),
      finalize(() => {
        this.spinner.hide();
        const elapsed = Date.now() - started;
        const msg = `${request.method} "${request.urlWithParams}"
               ${ok} in ${elapsed} ms.`;
      })
    );
  }
}
