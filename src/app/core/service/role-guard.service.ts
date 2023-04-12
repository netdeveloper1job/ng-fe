import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
    public _storage: LocalStorageService
  ) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data['expectedRole'];
    // decode the token to get its payload
    const tokenPayload = this._storage.getUser.user_type;
    if (!this.auth.isAuthenticated() || tokenPayload !== expectedRole) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
