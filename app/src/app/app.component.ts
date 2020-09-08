import { Component } from '@angular/core';
import { ModalsService } from "./services/modal.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public modalsService: ModalsService) {}

  closeModal(type: string) {
    this.modalsService.close(type);
  }

  openModal(type: string) {
    this.modalsService.open(type);
  }
}
