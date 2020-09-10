import {Injectable, NgZone} from '@angular/core';
import {AngularFireMessaging} from '@angular/fire/messaging';
import {BehaviorSubject} from 'rxjs'
import {UserService} from "./user.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";

@Injectable()
export class NotificationService {

  currentMessage = new BehaviorSubject(null);
  notificationReceiverToken = null;
  private unsubscribeOnTokenRefresh: Promise<any>;

  private httpOptionsWithToken = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `key=${environment.serverKey.key}`
    })
  };

  constructor(private angularFireMessaging: AngularFireMessaging, private userService: UserService,
              private http: HttpClient, private zone: NgZone) { }

  async enableNotifications() {
    return new Promise((resolve, reject) => {
      this.angularFireMessaging.requestToken.subscribe((token) => {
        this.notificationReceiverToken = token;
        resolve(token);
        this.updateToken();
        this.setupOnTokenRefresh();
      });
    });
  }

  /*
  receiveNotification() {
    console.log("trying to receive message...");
    return this.angularFireMessaging.messages.subscribe((payload: any) => {
      console.log("new message received. ", payload);

      const NotificationOptions = {
        body: payload.notification.body,
        data: payload.data,
      }

      navigator.serviceWorker.getRegistration("/firebase-cloud-messaging-push-scope").then(registration => {
        registration.showNotification(payload.notification.title, NotificationOptions);
      });

      this.currentMessage.next(payload);
    });
  }
   */

  sendLocalNotifications(title: string, description: string, token: string) {
    let notificationBody = {
      "notification": {
        "title": `${title}`,
        "body": `${description}`
      },
      "to": `${this.notificationReceiverToken}`
    }

    this.http.post('https://fcm.googleapis.com/fcm/send', JSON.stringify(notificationBody), this.httpOptionsWithToken)
      .subscribe((data) => { }, error => console.log(error));
  }

  private updateToken() {
    this.angularFireMessaging.getToken.subscribe((currentToken) => {
      console.log('update token in notificationsService: ', currentToken);
      return this.userService.setFcmToken(currentToken);
    });
  }

  private setupOnTokenRefresh(): void {
    this.unsubscribeOnTokenRefresh = this.angularFireMessaging.onTokenRefresh(() => {
      this.userService.setFcmToken(null).then(() => { this.updateToken(); });
    });
  }

}
