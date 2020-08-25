import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../../services/auth.service";
import {CordovaService} from "../../../services/cordova.service";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"],
})
export class MainLayoutComponent implements OnInit{
  constructor(public authService: AuthService, public cordovaService: CordovaService) { }

  ngOnInit() { }

  getName(): string {
    if (this.authService.user.email) {
      return this.authService.user.displayName;
    }
    return "Anonymous user";
  }
}
