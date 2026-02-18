import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {AuthToken, LoginVal, User} from '../models/user';
import {map} from 'rxjs';
import {environment} from '../../../environments/environment';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private cookie = inject(CookieService)
  private router = inject(Router)
  currentUser = signal<User | null>(null)

  logout() {
    this.cookie.delete('auth')
    this.router.navigateByUrl('/')
  }
  login(values: LoginVal) {
    if (values.email === 'admin@bingo.com' && values.password === 'BingoAdmin75!') {
      this.cookie.set('auth', 'fujbedcfifvikrcixdeixdyexdexexydejxdeyujdcexhdikiky3wkicjdue4r5fri5dxeyuiru78lo9r98r4i9duirik7dik9ui')
      this.currentUser.set({
        email: 'admin@bingo.com',
        lastName: '',
        firstName: ''
      })
      this.router.navigateByUrl('/')
    }
  }
}
