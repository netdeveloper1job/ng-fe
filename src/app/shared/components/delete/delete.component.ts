import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  private subscriptions: Subscription[] = [];
  @Input() id: any;
  @Input() service: any;
  constructor(public modalService: NgbModal,public activeModal: NgbActiveModal,private toastr: ToastrService,) {}

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  deleteItem(){
    this.subscriptions.push(this.service.delete(this.id).subscribe((res:any)=>{
      this.toastr.success(res.message, 'success');
      this.activeModal.dismiss("Delete successfully");
    },(err:any)=>{
      this.toastr.error(err.nessage, 'Error');
      this.activeModal.dismiss(`Error  ${err}`);
    }));
  }
}
