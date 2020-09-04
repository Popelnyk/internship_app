import {Injectable, OnInit} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import { firestoreConfig } from "../../firestoreConfig";
import { AuthService } from "./auth.service";

@Injectable()
export class EventsService {
  events: AngularFirestoreCollection | null;

  constructor(private db: AngularFirestore, private authService: AuthService) {
    this.events = db.collection(firestoreConfig.users_endpoint).doc(this.authService.user.uid)
                    .collection(firestoreConfig.events_endpoint);
  }

  addEvent(event) {
    this.events.add(event);
  }
}
