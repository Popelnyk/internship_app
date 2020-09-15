import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {CordovaService} from "../../../services/cordova.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: "app-auth-page",
  templateUrl: "./auth-page.component.html",
  styleUrls: ["./auth-page.component.scss"],
})
export class AuthPageComponent implements OnInit{

  googleLogoUrl: string = "https://img.icons8.com/clouds/200/000000/google-logo.png";

  constructor(public authService: UserService, public cordovaService: CordovaService) { }

  ngOnInit() {
    if (this.cordovaService.onCordova) {
      this.authService.updateUser();
    }
  }

}
