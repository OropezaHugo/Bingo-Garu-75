import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {GoogleUserInfo} from '../../core/models/user';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  imports: [
    MatButton,
    ReactiveFormsModule,
    MatIcon,
    MatCard
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  userService = inject(AccountService)
  tokenData: GoogleUserInfo | undefined = undefined;
  ngOnInit() {
    this.tokenData = this.userService.getTokenData()
  }

  loginWithGoogle() {
    window.location.href = 'http://localhost:5075/api/auth/login'; // Backend de .NET
  }

  logout() {
    this.userService.logout()
  }

}
