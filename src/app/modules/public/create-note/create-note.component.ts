import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { NoteService } from 'src/app/core/service/note.service';
import { UpdatenoteService } from 'src/app/core/service/updatenote.service';

@Component({
  selector: 'app-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss'],
})
export class CreateNoteComponent {
  private subscriptions: Subscription[] = [];
  public form!: FormGroup;
  public submitted: boolean = false;
  user: any;
  constructor(
    private _note: NoteService,
    private fb: FormBuilder,
    private _router: Router,
    private toastr: ToastrService,
    private _activeRoute: ActivatedRoute,
    private _upadtenote: UpdatenoteService
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '');
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      userId: this.user.id,
      status: ['active'],
    });
    if (this._activeRoute.snapshot.params['noteId'] != undefined) {
      this.getNoteById();
    }
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
    if (this.form.valid) {
      if (this._activeRoute.snapshot.params['noteId']) {
        this.form.value.id = this._activeRoute.snapshot.params['noteId'];
        this.subscriptions.push(
          this._upadtenote.update(this.form.value).subscribe(
            (res: any) => {
              this.toastr.success(res.nessage, 'Update Note Successfully');
              this._router.navigate(['/notes']);
            },
            (err) => {
              this.toastr.error(err.nessage, 'Error');
            }
          )
        );
      } else {
        this.subscriptions.push(
          this._note.create(this.form.value).subscribe(
            (res) => {
              this.toastr.success(res.message, 'Create Note Successfully');
              this._router.navigate(['/notes']);
            },
            (err) => {
              this.toastr.error(err.nessage, 'Error');
            }
          )
        );
      }
    }
  }
  
  getNoteById() {
    this.subscriptions.push(
      this._note.getById(this._activeRoute.snapshot.params['noteId']).subscribe(
        (res: any) => {
          this.form.patchValue(res);
        },
        (err) => {
          this.toastr.error(err.nessage, 'Error');
        }
      )
    );
  }
}
