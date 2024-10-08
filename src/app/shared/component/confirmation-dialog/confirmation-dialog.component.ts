import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmableType } from '../../enums/confirmable-type.enum';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  @ViewChild('content') content: any;

  modalMessage = '';
  confirmableType: ConfirmableType;
  loading = false;
  modalRef: NgbModalRef | undefined;
  onConfirmed = new EventEmitter();

  confirm = ConfirmableType.Confirm;
  delete = ConfirmableType.Delete;
  inform = ConfirmableType.Inform;

  constructor() {}

  ngOnInit() {}

  confirmButton() {
    this.onConfirmed.emit();
  }

  close() {
    this.modalRef?.close({
      confirmed: false,
    });
  }
}
