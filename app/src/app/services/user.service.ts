import {Injectable, NgZone} from "@angular/core";
import {auth} from "firebase/app";
import {User} from "../interfaces/user";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/auth";
import {CordovaService} from "./cordova.service";
import {AngularFirestore} from "@angular/fire/firestore";
import {firestoreConfig} from "../../firestoreConfig";


@Injectable({
  providedIn: "root"
})
export class UserService {

  user: User;
  userToken: string | null;

  constructor(
    public router: Router,
    public ngZone: NgZone,
    public afAuth: AngularFireAuth,
    public cordovaService: CordovaService,
    public db: AngularFirestore,
  ) {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
      if (this.isUserLogged()) {
        this.db.collection<User>(firestoreConfig.users_endpoint).doc(user.uid).set({
          name: this.user.displayName,
          email: this.user.email,
          token: null,
        }).then()
          .catch(err => console.log(err));
      }
    });
  }

  isUserLogged(): boolean {
    return !!(this.user && (this.user.email || this.user.displayName));
  }

  setFcmToken(token: string) {
    if (this.isUserLogged()) {
      return this.db.collection<User>(firestoreConfig.users_endpoint).doc(this.user.uid).update({
        token: token,
      }).then(() => { this.userToken = token; })
        .catch((err) => console.log(err));
    }
  }

  //FireBase sign-in with pop up web version and redirect for mobile
  async OAuthProvider(provider: auth.AuthProvider) {
    if (!this.cordovaService.onCordova) {
      return await this.afAuth.signInWithPopup(provider)
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
      this.userToken = null;
      this.router.navigate(['login']);
    })
  }

}
