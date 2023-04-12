import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
import { LocalStorageService } from 'src/app/core/service/local-storage.service';

import { UserService } from 'src/app/core/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private subscriptions: Subscription[] = [];
  public arbiterResponse: any;
  usersById: any;
  users: any;
  status: any;
  constructor(
    private router: Router,
    private _storage: LocalStorageService,
    public _auth: AuthService,
    private _service: UserService,
   
  ) {}

  ngOnInit() {
    this.getUsersById();
   
     
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  logout() {
    this._storage.clearStorage();
  }
  test: any;
  getUsersById() {
    if (this._storage?.getUser?.id) {
      this.subscriptions.push(
        this._service.getById(this._storage?.getUser?.id).subscribe((res) => {
          console.log(res);
          this.status = res.status;
          this.usersById = res.url;
          this.users = res.name;
          console.log('user name',this.users)
        })
      );
    }
  }
}
