import { Injectable, NgZone } from "@angular/core";
import { auth } from "firebase/app";
import { User } from "./user";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";


@Injectable({
  providedIn: "root"
})
export class AuthService {
  user: User;

  constructor(
    public router: Router,
    public ngZone: NgZone,
    public afAuth: AngularFireAuth,
    private angularFireAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe(user => this.user = user);
  }

  //FireBase sign-in with popup
  OAuthProvider(provider: auth.AuthProvider) {
    return this.afAuth.signInWithPopup(provider)
      .then(res => {
        this.ngZone.run(() => {
          this.router.navigate(['main-layout']);
        });
      }).catch(error => {
        window.alert(error);
      });
  }

  //FireBase Google sign-in
  SignInWithGoogle() {
    return this.OAuthProvider(new auth.GoogleAuthProvider())
      .then(res => {
        console.log("Successfully");
      }).catch(error => {
        console.log(error);
      });
  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['login']);
    })
  }
}
