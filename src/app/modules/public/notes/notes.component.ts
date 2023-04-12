import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NoteService } from 'src/app/core/service/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent {
  subscriptions: any;
  user: any;
  usernote: any;
  public note: any;
  confirmDialogService: any;
  constructor(
    private _note: NoteService,

    private toastr: ToastrService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '');
    this.getnotes();
  }

  getnotes() {
    this._note.get().subscribe((res: any) => {
      this.note = res;
      this.usernote = this.note.filter((x: any) => x.userId == this.user.id);
    });
  }

  deletenote(id: any) {
    this._note.delete(id).subscribe(
      (res) => {
        this.toastr.success(res.message, 'Note Deleted');
        this.getnotes();
      },
      (err) => {
        this.toastr.error(err.message, 'Error');
      }
    );
  }

  noteEdit(id: any) {
    this._router.navigate([`update-notes/${id}`]);
  }
}
