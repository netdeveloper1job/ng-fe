import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService extends HttpService {
  constructor(httpClient: HttpClient, private http: HttpClient) {
    super(httpClient, environment.url, 'users');
  }

  verifyUserEMail(data: any) {
    return this.http
      .post<any>(
        `${environment.url}/users`,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleErrors));
  }

  getUserById(id: number): Observable<any> {
    return this.http
      .get<any>(`${environment.url}/users/${id}`)
      .pipe(retry(2), catchError(this.handleErrors));
  }

  updateVarifiedUser(data: any) {
    return this.http
      .patch<any>(
        `${environment.url}/users/verification/${data.userid}`,
        data,
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleErrors));
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
}
