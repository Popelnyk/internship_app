import {Component, OnDestroy, OnInit} from "@angular/core";
import {ModalsService} from "../../../services/modal.service";
import {Observable} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {EventsService} from "../../../services/events.service";
import {firestoreConfig} from "../../../../firestoreConfig";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: "app-list-events",
  templateUrl: "./list-events.component.html",
  styleUrls: ["./list-events.component.scss"],
})
export class ListEventsComponent implements OnInit {
  events: Observable<any[]> | null;
  eventList: AngularFirestoreCollection | null;

  constructor(public modalsService: ModalsService, public eventsService: EventsService, private db: AngularFirestore,
              private authService: AuthService) {
    this.eventList = db.collection(firestoreConfig.users_endpoint).doc(this.authService.user.uid)
                       .collection(firestoreConfig.events_endpoint);
    console.log('endpoint', firestoreConfig.users_endpoint, this.authService.user.uid, firestoreConfig.events_endpoint);
  }
  //
  ngOnInit() {
    this.events = this.eventList.valueChanges();
  }

  onCreateEvent() {
    this.modalsService.open(this.modalsService.modals.CREATE_EVENT_MODAL, /*Firebase user data (id)*/)
  }
}
