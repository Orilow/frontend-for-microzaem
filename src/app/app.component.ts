import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-for-microzaem';
  currentUser: string;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  tryGetBankAccount() {
    if (!this.currentUser) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/bankAccounts']);
    }
  }
}
