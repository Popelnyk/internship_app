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

  time = new Observable<any>((observer: Observer<any>) => {
    setInterval(() => {
        observer.next(new Date().toString());
        this.checkEventsDates(this.authService.userToken);
      }, 60000);
  })

  constructor(
    public modalsService: ModalsService,
    private db: AngularFirestore,
    private authService: UserService,
    private notificationsService: NotificationService
  ) {
    this.eventList = db.collection(firestoreConfig.users_endpoint).doc(this.authService.user.uid)
                       .collection(firestoreConfig.events_endpoint, ref => ref.orderBy('EventDate'));
  }

  async ngOnInit() {
    await this.notificationsService.enableNotifications();
    this.events = this.eventList.valueChanges();
  }

  onCreateEvent() {
    this.modalsService.open(this.modalsService.modals.CREATE_EVENT_MODAL);
  }

  onDeleteEvent(eventUi) {
    this.modalsService.open(this.modalsService.modals.DELETE_EVENT_MODAL, eventUi);
  }

  compareDateNowAndEventDate(eventDateStr: string) {
    let date = new Date().getTime();
    let deadline = new Date(eventDateStr).getTime();
    let difference = (deadline - date) / (1000 * 60);
    return difference < 30;
  }

  checkEventsDates(token: string) {
    this.events.subscribe(values => {
      for (let item of values) {
        if (this.compareDateNowAndEventDate(item.EventDate)) {
          this.notificationsService.sendLocalNotifications(`${item.EventTitle} event is coming to an end`,
            item.EventDescription, token);
        }
      }
    });
  }

}

//test
