import {Component, getPlatform, OnInit} from "@angular/core";
import {AuthService} from "../../../services/auth.service";
import {CordovaService} from "../../../services/cordova.service";

@Component({
  selector: "app-auth-page",
  templateUrl: "./auth-page.component.html",
  styleUrls: ["./auth-page.component.scss"],
})
export class AuthPageComponent implements OnInit{
  backgroundImageUrl: string = "https://images.wallpaperscraft.ru/image/les_tropinka_derevya_118806_1920x1080.jpg";
  googleLogoUrl: string = "https://img.icons8.com/clouds/200/000000/google-logo.png";
  cordovaPlugins: string = '';

  constructor(public authService: AuthService, public cordovaService: CordovaService) { }

  ngOnInit() {
    if ((<any>window)._cordovaNative) {
      this.cordovaPlugins = Object.keys(<any>window).join(', ');
      this.authService.updateUser();
    }
  }
}
