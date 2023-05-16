import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NoteService } from 'src/app/core/service/note.service';
import { NotebyuseridService } from 'src/app/core/service/notebyuserid.service';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';

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
  modalRef: any;
  constructor(
    private _note: NoteService,
    private _noteByUserId :NotebyuseridService,
    private toastr: ToastrService,
    private _router: Router,private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user') || '');
    this.getNotesByUserId();
  }

  getNotesByUserId() {
    console.log('hit');
    this._noteByUserId.getById(this.user.id).subscribe((res: any) => {
      this.note = res;
      console.log('data',this.note);
    });
  }

  deletenote(id: any) {
    this.modalRef = this.modalService.open(DeleteComponent);
    this.modalRef.componentInstance.id = id;
    this.modalRef.componentInstance.service = this._note;
    this.modalRef.result.then(
      (result:any) => {
        console.log(`Closed with: ${result}`);
      },
      (reason:any) => {
        console.log(`Dismissed ${this.getDismissReason(reason)}`);
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else if (reason == 'Delete successfully') {
      this.getNotesByUserId();
      return `with: ${reason}`;
    } else {
      return `with: ${reason}`;
    }
  }

  noteEdit(id: any) {
    this._router.navigate([`update-notes/${id}`]);
  }
}
