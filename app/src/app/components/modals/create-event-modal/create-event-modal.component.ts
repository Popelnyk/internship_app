import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ModalsService} from "../../../services/modal.service";

export const CREATE_EVENT_MODAL = 'CREATE_EVENT_MODAL';

@Component({
  selector: "app-create-event-modal",
  templateUrl: "./create-event-modal.component.html",
  styleUrls: ["./create-event-modal.component.scss"]
})
export class CreateEventModalComponent {

  constructor(public modalsService: ModalsService) {
  }

  @Output() cbClose: EventEmitter<void> = new EventEmitter<void>();
  @Input() data;

  async onSubmit() {
    this.cbClose.emit();
  }
}
