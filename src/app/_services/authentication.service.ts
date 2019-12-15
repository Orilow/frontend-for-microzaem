import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {AppSettings} from '../app-settings';
import {Response} from '../_models';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): string {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {

    return this.http.post( AppSettings.LOGIN_URL, {username, password})
      .pipe(map (data => {
        const res = data.valueOf() as Response;
        if (res && res.status === 'OK') {
          localStorage.setItem('currentUser', res.payload.toString());
          this.currentUserSubject.next(res.payload.valueOf().toString());
        } else if (res && res.status === 'INTERNAL_ERROR') {
          throw Error(res.message);
        } else {
          throw Error('Wrong Answer from server. Try again later');
        }

        return data;
      }));
  }

  register(firstName: string, lastName: string, username: string, password: string) {
    return this.http.post(AppSettings.REGISTER_URL, {firstName, lastName, username, password})
      .pipe(map(answer => {
        const res = answer.valueOf() as Response;
        if (res && res.status === 'INTERNAL_ERROR') {
          throw Error(res.message);
        } else if (!res) {
          throw Error('Wrong Answer from server. Try again later');
        }

        return res;
      }));
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }
}
