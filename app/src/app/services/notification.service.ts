import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class NotificationService {

  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireMessaging: AngularFireMessaging) { }

  requestNotification() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
      });
  }

  receiveNotification() {
    this.angularFireMessaging.messages.subscribe(
      (msg) => {
        console.log("show message!", msg);
        this.currentMessage.next(msg);
      })
  }
}
