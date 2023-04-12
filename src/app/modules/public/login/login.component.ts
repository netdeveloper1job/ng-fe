import { Component } from '@angular/core';
import { LoginService } from 'src/app/core/service/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/core/service/local-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public form!: FormGroup;
  public submitted: boolean = false;

  constructor(
    private _service: LoginService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _storage: LocalStorageService,
    private _router: Router,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this._service.create(this.form.value).subscribe(
        (res) => {
          console.log(res);
          if (res.status == 403) {
            this.toastr.error(res.message, 'Error');
          } else {
            this._storage.setToken = res.token;
            this._storage.setUser = res.user;
            this.toastr.success(res.message, 'User Login Successfully');
             this._router.navigate(['/notes']);
           
          }
        },
        (err) => {
          this.toastr.error(err.nessage, 'Error');
        }
      );
    }
  } 
}
