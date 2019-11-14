import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../app-settings';
import {map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class BankAccountsService {
  constructor(private http: HttpClient) { }

  createNewBankAccount(currency, name) {
    return this.http.put(AppSettings.RIGHT_CREATE_BANK_ACC_URL, {currency, name, balance: 0});
  }

  getAccounts() {

  }
}
