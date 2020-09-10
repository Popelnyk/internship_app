import { Injectable,NgZone } from "@angular/core";
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

function _window(): any {
  return window;
}

@Injectable()
export class CordovaService {

  private resume: BehaviorSubject<boolean>;
  constructor(private zone: NgZone) {
    /*
    this.resume = new BehaviorSubject<boolean>(null);
    Observable.fromEvent(document, 'resume').subscribe(event => {
      this.zone.run(() => {
        this.onResume();
      });
    });
     */
  }

  get cordova(): any {
    return _window().cordova;
  }

  get onCordova(): Boolean {
    return !!_window().cordova;
  }

  public onResume(): void {
    this.resume.next(true);
  }

  /*
  public notify(): void {
    _window().navigator.notification.confirm(
      'You are the winner!',
      ( ) => { },
      'Game Over',
      ['Restart','Exit']
    );
  }
   */

}
