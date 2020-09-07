import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ModalsService} from "../../../services/modal.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EventsService} from "../../../services/events.service";

export const CREATE_EVENT_MODAL = 'CREATE_EVENT_MODAL';

@Component({
  selector: "app-create-event-modal",
  templateUrl: "./create-event-modal.component.html",
  styleUrls: ["./create-event-modal.component.scss"]
})
export class CreateEventModalComponent implements OnInit{

  @Output() cbClose: EventEmitter<void> = new EventEmitter<void>();
  @Input() data;

  eventForm: FormGroup | null = null;
  currentTime: number = Date.now();

  constructor(public modalsService: ModalsService, public eventsService: EventsService) { }

  ngOnInit() {
    this.eventForm = new FormGroup({
      EventTitle: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(35),
      ]),
      EventDescription: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(170),
      ]),
      EventDate: new FormControl("", [
        Validators.required,
      ])
    });
  }

  async onSubmit({form: {value: values}}) {
    console.log(values);
    await this.eventsService.addEvent(values);
    this.cbClose.emit();
  }
}
