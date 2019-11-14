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
  wantsToCreate = false;
  loadingToAdd = false;
  successfulToAdd = false;
  error: string;
  constructor(private formBuilder: FormBuilder,
              private bankAccountsService: BankAccountsService) {
    this.bankAccountsService.getAccounts();
  }

  ngOnInit() {
    this.newAccountForm = this.formBuilder.group({
      currency: [undefined || null, Validators.required],
      name: ['', Validators.required]
    });
  }

  get f() { return this.newAccountForm.controls; }
  onSubmit() {
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
