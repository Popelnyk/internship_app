import {Component, NgZone, OnDestroy, OnInit} from "@angular/core";
import {ModalsService} from "../../../services/modal.service";
import {Observable, Observer} from "rxjs";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {EventsService} from "../../../services/events.service";
import {firestoreConfig} from "../../../../firestoreConfig";
import {UserService} from "../../../services/user.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: "app-list-events",
  templateUrl: "./list-events.component.html",
  styleUrls: ["./list-events.component.scss"],
})
export class ListEventsComponent implements OnInit {

  events: Observable<any[]> | null;
  eventList: AngularFirestoreCollection | null;
  defaultColor: string = "#4B9180";
  outDatedColor: string = "#888888";

  /*
  time = new Observable<any>((observer: Observer<any>) => {
    setInterval(() => {
        observer.next(new Date().toString());
        console.log(new Date().toString());
      }, 1000
    );
  })
   */

  constructor(public modalsService: ModalsService, public eventsService: EventsService, private db: AngularFirestore,
              private authService: UserService, private notificationService: NotificationService, private zone: NgZone) {
    this.eventList = db.collection(firestoreConfig.users_endpoint).doc(this.authService.user.uid)
                       .collection(firestoreConfig.events_endpoint, ref => ref.orderBy('EventDate'));
    console.log('endpoint', firestoreConfig.users_endpoint, this.authService.user.uid, firestoreConfig.events_endpoint);
  }

  ngOnInit() {
    this.events = this.eventList.valueChanges();
  }

  onCreateEvent() {
    this.modalsService.open(this.modalsService.modals.CREATE_EVENT_MODAL, /*Firebase user data (id)*/);
  }

  onDeleteEvent(eventUi) {
    this.modalsService.open(this.modalsService.modals.DELETE_EVENT_MODAL, eventUi);
  }

  onEventEndsColor(deadlineDateStr: string, title: string, description: string) {
    let date = new Date().getTime();
    let deadline = new Date(deadlineDateStr).getTime();
    let difference = (deadline - date) / (1000 * 60);
    console.log(difference.valueOf());

    if (difference < 3) {
      console.log('ye');
      //this.notificationService.sendLocalNotifications(`${title} almost out of date`, description);
      return "#D15858"
    }
    return "#1FA292";
  }
}
