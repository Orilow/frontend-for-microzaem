import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppSettings} from '../app-settings';
import {map} from 'rxjs/operators';
import {Response} from '../_models';

@Injectable({ providedIn: 'root' })
export class BankAccountsService {
  constructor(private http: HttpClient) { }

  get headers(): HttpHeaders {
    return new HttpHeaders({'x-auth-token': this.token});
  }

  private get token(): string {
    return localStorage.getItem('currentUser');
  }

  createNewBankAccount(currency, name) {
    return this.http.post(AppSettings.CREATE_BANK_ACCOUNT_URL, {currency, name, balance: 0}, {headers: this.headers});
  }

  getAccounts() {
    console.log(this.token);
    return this.http.get(AppSettings.ALL_ACCOUNTS_URL, {headers: this.headers}).pipe(
      map(data => {
        const res = data.valueOf() as Response;
        if (res && res.status === 'OK') {
          return res.payload;
        } else if (res && res.status === 'INTERNAL_ERROR') {
          throw Error(res.message);
        } else {
          throw Error('Wrong Answer from server. Try again later');
        }
      })
    );
  }
}
