import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    public _storage: LocalStorageService
  ) {}
  // ...
  public isAuthenticated(): boolean {
    const token: any = this._storage.getToken;
    if(token && token != 'null') return true;
    else return false;
    // Check whether the token is expired and return
    // true or false
  }
}
