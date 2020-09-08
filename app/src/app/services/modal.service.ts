import { Injectable } from '@angular/core';
import { CREATE_EVENT_MODAL } from "../components/modals/create-event-modal/create-event-modal.component";
import { DELETE_EVENT_MODAL } from "../components/modals/delete-event-modal/delete-event-modal.component";

@Injectable()
export class ModalsService {

  constructor() {
    this.initModals();
  }

  initModals(): void {
    /*
     for (const modalKey in this.modals) {
       if (this.modals.hasOwnProperty(modalKey)) {
         this.openedModals[modalKey] = false;
       }
     }
     */
  }

  openedModals = {
    [CREATE_EVENT_MODAL]: {isOpen: false, data: {}},
    [DELETE_EVENT_MODAL]: {isOpen: false, data: {}},
  };

  modals = {
    CREATE_EVENT_MODAL,
    DELETE_EVENT_MODAL,
  };


  close(type: string) {
    this.openedModals[type] = {isOpen: false};
  }

  open(type: string, data?) {
    this.openedModals[type] = {isOpen: true, data};
  }

}
