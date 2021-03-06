import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthPageComponent } from "./components/pages/auth-page/auth-page.component";
import { MainLayoutComponent } from "./components/pages/main-layout/main-layout.component";
import { AppRoutingModule } from "./app-routing.module";

import {AngularFireModule} from "@angular/fire";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {environment} from "../environments/environment.prod";
import {UserService} from "./services/user.service";
import {AngularFireAnalyticsModule} from "@angular/fire/analytics";
import {CordovaService} from "./services/cordova.service";
import {ListEventsComponent} from "./components/lists/list-events/list-events.component";
import {CreateEventModalComponent} from "./components/modals/create-event-modal/create-event-modal.component";
import {ModalsService} from "./services/modal.service";
import {ModalComponent} from "./ui/Modal/modal.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {EventsService} from "./services/events.service";
import {AngularFirestoreModule, AngularFirestore, SETTINGS} from "@angular/fire/firestore";
import {ServiceWorkerModule} from '@angular/service-worker';
import {AngularFireMessagingModule} from "@angular/fire/messaging";
import {NotificationService} from "./services/notification.service";
import {DeleteEventModalComponent} from "./components/modals/delete-event-modal/delete-event-modal.component";
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    MainLayoutComponent,
    ListEventsComponent,
    CreateEventModalComponent,
    DeleteEventModalComponent,
    ModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireMessagingModule,
    HttpClientModule,
    ServiceWorkerModule.register('combined-sw.js', { enabled: environment.production }),
  ],
  providers: [
    UserService,
    CordovaService,
    ModalsService,
    EventsService,
    AngularFirestore,
    NotificationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
