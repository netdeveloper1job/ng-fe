import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/core/service/register.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  private subscriptions: Subscription[] = [];
  public form!: FormGroup;
  public submitted: boolean = false;
  constructor(
    private _service: RegisterService,
    private fb: FormBuilder,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form);
    if (this.form.valid) {
      this.subscriptions.push(
        this._service.verifyUserEMail(this.form.value).subscribe(
          (res) => {
            if (res.status == 200) {
              this.toastr.success(res.message, '');
              this._router.navigate(['login']);
            } else {
              this.toastr.error(res.message, 'Success');
            }
          },
          (err) => {
            this.toastr.error(err.message, 'Email Id already exist');
          }
        )
      );
    }
  }
}
