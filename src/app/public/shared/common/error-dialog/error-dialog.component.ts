import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent implements OnInit {
  @Input() public data;

  constructor(public modal: NgbModal, public activeModal: NgbActiveModal) {}

  ngOnInit() {}

  c(e) {
    console.log(e);
    this.activeModal.close();
  }

  d(e) {
    console.log(e);
    this.modal.dismissAll();
  }
}
