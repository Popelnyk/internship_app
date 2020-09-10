import {Component, EventEmitter, Input, Output} from "@angular/core";
import {ModalsService} from "../../../services/modal.service";
import {EventsService} from "../../../services/events.service";

export const DELETE_EVENT_MODAL = "DELETE_EVENT_MODAL";

@Component({
  selector: "app-delete-event-modal",
  templateUrl: "./delete-event-modal.component.html",
  styleUrls: ["./delete-event-modal.component.scss"],
})
export class DeleteEventModalComponent {

  @Output() cbClose: EventEmitter<void> = new EventEmitter<void>();
  @Input() data;

  constructor(public modalsService: ModalsService, public eventsService: EventsService) { }

  async onSubmit() {
    await this.eventsService.deleteEvent(this.data);
    this.cbClose.emit();
  }

}
