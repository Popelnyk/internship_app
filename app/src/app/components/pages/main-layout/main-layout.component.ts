import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {CordovaService} from "../../../services/cordova.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"],
})
export class MainLayoutComponent implements OnInit{
  constructor(public authService: UserService, public cordovaService: CordovaService,
              public notificationsService: NotificationService) { }

  ngOnInit() {
    this.notificationsService.enableNotifications();
  }
}
