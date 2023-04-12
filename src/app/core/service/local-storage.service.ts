import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private router: Router) { }

  set setToken(token: any){
    localStorage.setItem('token',token);
  }

  set setUser(data: any){
    localStorage.setItem('user',JSON.stringify(data));
  }

  get getToken(){
    return localStorage.getItem('token');
  }

  get getUser(){
    const user:any = localStorage.getItem('user');
    return JSON.parse(user);
  }



  clearStorage(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
