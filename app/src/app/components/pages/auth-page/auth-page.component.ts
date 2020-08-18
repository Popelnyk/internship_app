import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: "app-auth-page",
  templateUrl: "./auth-page.component.html",
  styleUrls: ["./auth-page.component.scss"],
})
export class AuthPageComponent implements OnInit{
  backgroundImageUrl: string = "https://images.wallpaperscraft.ru/image/les_tropinka_derevya_118806_1920x1080.jpg";

  constructor(public authService: AuthService) { }
  ngOnInit() { }
}
