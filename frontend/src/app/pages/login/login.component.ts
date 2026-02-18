import {Component, inject} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AccountService } from '../../core/services/account.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';

@Component({
  selector: 'app-login',
  imports: [
    MatLabel,
    MatInput,
    FormsModule,
    MatFormField,
    MatButton,
    ReactiveFormsModule,
    MatCard
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  returnUrl = '/bingo/lobby'
  constructor() {
    const url = this.activatedRoute.snapshot.queryParams['returnUrl'];
    if (url) {
      this.returnUrl = url;
    }
  }
  loginForm = this.fb.group({
    email: [''],
    password: [''],
  });
  onSubmit() {
    if (this.loginForm.value.email !== undefined
      && this.loginForm.value.password !== undefined
    && this.loginForm.value.email !== null
      && this.loginForm.value.password !== null){
      this.accountService.login({email: this.loginForm.value.email, password: this.loginForm.value.password})
    }
  }
}
