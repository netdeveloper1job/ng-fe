import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService extends HttpService{

  constructor(httpClient: HttpClient,private httpClients: HttpClient) {
    super(httpClient, environment.url, 'users');
  }

  updateStatus(item: any): Observable<any> {
    return this.httpClients
      .put<any>(
        `${environment.url}/user/status/${item.id}`,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleErrors));
  }

  forgetPassword(item: any): Observable<any> {
    return this.httpClients
      .post<any>(
        `${environment.url}/forget-password`,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleErrors));
  }

  updatePassword(item: any): Observable<any> {
    return this.httpClients
      .post<any>(
        `${environment.url}/update-password`,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.errorsHandler));
  }

  updateCryptoAddress(item: any): Observable<any> {
    return this.httpClients
      .post<any>(
        `${environment.url}/update-crypto-address`,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.errorsHandler));
  }

  private handleErrors(error: HttpErrorResponse) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      //error client
      errorMessage = error.error.message;
    } else {
      //error server
      errorMessage = `error: ${error.status}, message: ${error.message}`;
    }

    return throwError(errorMessage);
  }

  private errorsHandler(error: any) {
    let errorMessage = '';
      errorMessage = `${error['response']}`;

    return throwError(errorMessage);
  }

}
