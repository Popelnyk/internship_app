import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { firestoreConfig } from "../../firestoreConfig";
import { ListEvent } from "../interfaces/listEvent";
import { AuthService } from "./auth.service";

@Injectable()
export class EventsService {
  events = null;

  constructor(private db: AngularFirestore, private authService: AuthService) {
    this.events = db.collection(firestoreConfig.users_endpoint).doc(this.authService.user.uid)
                    .collection(firestoreConfig.events_endpoint);
    console.log(this.events);
  }

  addEvent(event) {
    this.events.add(event);
  }
}
