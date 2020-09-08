import {Injectable, NgZone} from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { UserService } from "./user.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";

@Injectable()
export class NotificationService {

  currentMessage = new BehaviorSubject(null);
  private unsubscribeOnTokenRefresh: Promise<any>;
  private httpOptionsWithToken = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `key=${environment.serverKey.key}`
    })
  };

  constructor(private angularFireMessaging: AngularFireMessaging, private userService: UserService,
              private http: HttpClient, private zone: NgZone) { }

  enableNotifications() {
    this.angularFireMessaging.requestToken.subscribe((token) => {
      console.log("token received.");
      this.updateToken();
      this.setupOnTokenRefresh();
    });
  }

  receiveNotification() {
    console.log("trying to receive message...");
    return this.angularFireMessaging.messages.subscribe((payload: any) => {
      console.log("new message received. ", payload);
      this.currentMessage.next(payload);
    });
  }

  sendLocalNotifications(title, description) {
    let notificationBody = {
      "notification": {
        "title": `${title}`,
        "body": `${description}`
      },
      "to": "fafDiVxQXt09K3gUpcpvda:APA91bFDAzuicy8lt-efznEvJmpffy-cEw7JptZhhYNcE-AqHqvWTwO17wHW1f_l1SSlmCb6qjmVWqQiWmZN9CdT-SVYwx-ONEq-l9aMRrUsoZHoAFOL27IX7-0pQaChQ7dRZXsLqpjM"
    }

    console.log('token', this.userService.userToken);

      this.http.post('https://fcm.googleapis.com/fcm/send', JSON.stringify(notificationBody), this.httpOptionsWithToken)
        .subscribe(
        (data) => {
          console.log(data);
        },
        error => console.log(error)
        )
  }

  private updateToken() {
    return this.angularFireMessaging.getToken.subscribe((currentToken) => {
      return this.userService.setFcmToken(currentToken);
    });
  }

  private setupOnTokenRefresh(): void {
    this.unsubscribeOnTokenRefresh = this.angularFireMessaging.onTokenRefresh(() => {
      this.userService.setFcmToken(null).then(() => { this.updateToken(); });
    });
  }
}
