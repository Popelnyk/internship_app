import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { UserService } from "./user.service";

@Injectable()
export class NotificationService {

  currentMessage = new BehaviorSubject(null);
  private unsubscribeOnTokenRefresh: Promise<any>;

  constructor(private angularFireMessaging: AngularFireMessaging, private authService: UserService) { }

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

  private updateToken() {
    return this.angularFireMessaging.getToken.subscribe((currentToken) => {
      return this.authService.setFcmToken(currentToken);
    });
  }

  private setupOnTokenRefresh(): void {
    this.unsubscribeOnTokenRefresh = this.angularFireMessaging.onTokenRefresh(() => {
      this.authService.setFcmToken(null).then(() => { this.updateToken(); });
    });
  }
}
