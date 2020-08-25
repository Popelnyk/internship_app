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

//import { DeviceDetectorModule } from "ngx-device-detector";

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    MainLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
  ],
  providers: [AuthService, CordovaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
