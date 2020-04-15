import { Injectable } from '@angular/core';
import { ErrorDialogComponent } from './error-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class ErrorDialogService {
    constructor(private modalService: NgbModal) {}

    open(data) {
      const modalRef = this.modalService.open(ErrorDialogComponent, { 
          size: 'lg',
          backdrop: 'static',
          windowClass: 'light-drop'
      });
      // Pass parameters to modal
      modalRef.componentInstance.data = data;  

      return modalRef;
   }
}
