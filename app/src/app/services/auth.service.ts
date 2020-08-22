import { Injectable, NgZone } from "@angular/core";
import { auth } from "firebase/app";
import { User } from "../interfaces/user";
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
  ) {
    this.afAuth.authState.subscribe(user => this.user = user);
  }

  //FireBase sign-in with pop up web version and redirect for mobile
  OAuthProvider(provider: auth.AuthProvider) {
    if (!(<any>window)._cordovaNative) {
      return this.afAuth.signInWithPopup(provider)
        .then(res => {
          this.ngZone.run(() => {
            this.router.navigate(['main-layout']);
          });
        }).catch(error => {
          window.alert(error);
        });
    } else {
      return this.afAuth.signInWithRedirect(provider);
    }
  }

  //FireBase Google sign-in
  SignInWithGoogle() {
    return this.OAuthProvider(new auth.GoogleAuthProvider()).catch(error => console.log(error));
  }

  async updateUser() {
    const result = <any> await this.afAuth.getRedirectResult();
    if (result.user) {
      this.router.navigate(['main-layout']);
    }
  }

  SignInAnonymously() {
    return this.afAuth.signInAnonymously()
      .then(res => {
        this.ngZone.run(() => {
          this.router.navigate(['main-layout']);
        });
      }).catch(error => {
        window.alert(error);
      })

  }

  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['login']);
    })
  }
}
