import {Injectable, OnInit} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import { firestoreConfig } from "../../firestoreConfig";
import { UserService } from "./user.service";
import {Observable, Observer} from "rxjs";

@Injectable()
export class EventsService {
  events: AngularFirestoreCollection | null;

  constructor(private db: AngularFirestore, private authService: UserService) {
    this.events = db.collection(firestoreConfig.users_endpoint).doc(this.authService.user.uid)
                    .collection(firestoreConfig.events_endpoint);
    console.log(this.events);
  }

  addEvent(event) {
    return this.events.add(event).then(res =>
      this.events.doc(res.id).update({
        EventId: res.id
      }).then(res => console.log(res))
    );
  }

  deleteEvent(eventUi) {
    return this.events.doc(eventUi).delete()
      .then(res => console.log("deleted"))
      .catch(err => console.log(err));
  }

  dateTracker(date) {

  }
}
