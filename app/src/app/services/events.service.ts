import { Injectable } from "@angular/core";
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { firestoreConfig } from "../../firestoreConfig";

@Injectable()
export class EventsService {
  events: AngularFirestoreCollection<Event>;

  constructor(private db: AngularFirestore) {
    this.events = db.collection(firestoreConfig.events_endpoint);
  }

  addEvent(event) {
    this.events.add(event);
  }
}
