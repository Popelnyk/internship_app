import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: "app-main-layout",
  templateUrl: "./main-layout.component.html",
  styleUrls: ["./main-layout.component.scss"],
})
export class MainLayoutComponent implements OnInit{
  constructor(public authService: AuthService) { }

  ngOnInit() { }

  getName(): string {
    if (this.authService.user.email !== null) {
      return this.authService.user.displayName;
    }
    return "Anonymous";
  }
}
