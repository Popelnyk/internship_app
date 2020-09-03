import {Component, OnInit} from "@angular/core";
import {ModalsService} from "../../../services/modal.service";
import {Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";
import {EventsService} from "../../../services/events.service";
import {firestoreConfig} from "../../../../firestoreConfig";

@Component({
  selector: "app-list-events",
  templateUrl: "./list-events.component.html",
  styleUrls: ["./list-events.component.scss"],
})
export class ListEventsComponent implements OnInit{
  events: Observable<any[]>;

  constructor(public modalsService: ModalsService, public eventsService: EventsService) { }

  ngOnInit() {
    this.events = this.eventsService.events.valueChanges();
    console.log(this.events);
  }

  onCreateEvent() {
    this.modalsService.open(this.modalsService.modals.CREATE_EVENT_MODAL, /*Firebase user data (id)*/)
  }

}
