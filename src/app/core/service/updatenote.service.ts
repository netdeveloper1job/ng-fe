import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdatenoteService extends HttpService{

  constructor(httpClient: HttpClient) {
    super(httpClient, environment.url, 'note/update');
   }
}
