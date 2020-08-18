import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: "app-auth-page",
  templateUrl: "./auth-page.component.html",
  styleUrls: ["./auth-page.component.scss"],
})
export class AuthPageComponent implements OnInit{
  backgroundPhotoUrl: string = "https://images.wallpaperscraft.ru/image/gory_zakat_nebo_gorizont_118121_1920x1080.jpg";

  constructor(public authService: AuthService) { }
  ngOnInit() { }
}
