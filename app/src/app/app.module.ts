import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthPageComponent } from "./components/pages/auth-page/auth-page.component";
import { MainLayoutComponent } from "./components/pages/main-layout/main-layout.component";
import { AppRoutingModule } from "./app-routing.module";

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from "../environments/environment.prod";
import { AuthService } from "./services/auth.service";
import { AngularFireAnalyticsModule } from "@angular/fire/analytics";
import {CordovaService} from "./services/cordova.service";
import {ListEventsComponent} from "./components/lists/list-events/list-events.component";
import {CreateEventModalComponent} from "./components/modals/create-event-modal/create-event-modal.component";
import {ModalsService} from "./services/modal.service";
import {ModalComponent} from "./ui/Modal/modal.component";
import {FormsModule} from "@angular/forms";

//import { DeviceDetectorModule } from "ngx-device-detector";

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    MainLayoutComponent,
    ListEventsComponent,
    CreateEventModalComponent,
    ModalComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireAuthModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAnalyticsModule,
        FormsModule,
    ],
  providers: [
    AuthService,
    CordovaService,
    ModalsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
