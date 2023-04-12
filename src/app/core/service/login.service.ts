import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends HttpService {

  constructor(httpClient: HttpClient) { 
    super(httpClient, environment.url, 'auth/login');
  }
}
