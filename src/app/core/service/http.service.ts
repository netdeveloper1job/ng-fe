import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private httpClient: HttpClient,
    @Inject(String)private url: string,
    @Inject(String)private endpoint: string
  ) {
    // this.url = `${config.environment.baseUrl}`;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  get(): Observable<any[]> {
    return this.httpClient
      .get<any[]>(`${this.url}/${this.endpoint}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getById(id: number): Observable<any> {
    return this.httpClient
      .get<any>(`${this.url}/${this.endpoint}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  create(item: any): Observable<any> {
    return this.httpClient
      .post<any>(
        `${this.url}/${this.endpoint}`,
        item,
        {observe:'body',responseType:'json'}
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  update(item: any): Observable<any> {
    return this.httpClient
      .post<any>(
        `${this.url}/${this.endpoint}/${item.id}`,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  updateData(item: any): Observable<any> {
    return this.httpClient
      .patch<any>(
        `${this.url}/${this.endpoint}/${item.id}`,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  delete(id: any) {
    return this.httpClient
      .delete<any>(`${this.url}/${this.endpoint}/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
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
