import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BankAccountsService} from '../_services/bank-accounts.service';
import {Response} from '../_models';

@Component({
  selector: 'app-bank-accounts',
  templateUrl: './bank-accounts.component.html',
  styleUrls: ['./bank-accounts.component.css']
})
export class BankAccountsComponent implements OnInit {
  newAccountForm: FormGroup;
  submittedToAdd = false;
  loadingToAdd = false;
  successfulToAdd = false;
  wantsToCreate = false;
  loadingAccounts = false;
  error: string;
  accounts: object;

  constructor(private formBuilder: FormBuilder,
              private bankAccountsService: BankAccountsService) {
    this.accounts = [];
    this.getAccounts();
  }

  ngOnInit() {
    this.newAccountForm = this.formBuilder.group({
      currency: [undefined || null, Validators.required],
      name: ['', Validators.required]
    });
  }

  getAccounts() {
    this.loadingAccounts = true;
    this.bankAccountsService.getAccounts().subscribe(data => {
      this.accounts = data;
      this.loadingAccounts = false;
    }, error1 => {
      this.error = error1.message;
      this.loadingAccounts = false;
    });
  }

  get f() { return this.newAccountForm.controls; }

  createBankAccount() {
    this.submittedToAdd = true;

    if (this.newAccountForm.invalid) {
      return;
    }

    this.loadingToAdd = true;
    this.bankAccountsService.createNewBankAccount(this.f.currency.value, this.f.name.value)
      .subscribe(data => {
        const res = data.valueOf() as Response;
        if (res && res.status === 'OK') {
          this.wantsToCreate = false;
          this.successfulToAdd = true;
        } else {
          this.error = res.message;
        }
        this.loadingToAdd = false;
        this.submittedToAdd = false;
      });
  }
}
