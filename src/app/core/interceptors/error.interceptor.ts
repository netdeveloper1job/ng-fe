import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { LocalStorageService } from '../service/local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private spinner: NgxSpinnerService,private _router: Router,private _storage:LocalStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next
      .handle(request)
      .pipe(catchError((error: HttpErrorResponse) => {
        const errorMessage:any = this.setError(error);
        if(errorMessage['response'] =='Expired token'){
          this._storage.clearStorage();
        }
        return throwError(errorMessage)
      }));
  }

  setError(error : HttpErrorResponse): string {
    this.spinner.hide();
    let errorMessage='Unknown error occured';
    if(error.error instanceof ErrorEvent){
      //client side error
      errorMessage = error.error.message;
    }else{
      if(error.status!=0){
        errorMessage = error.error;
      }
    }
    return errorMessage;
  }
}
