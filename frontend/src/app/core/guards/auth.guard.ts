import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {AccountService} from '../services/account.service';

export const authGuard: CanActivateFn = (route, state) => {
  let cookieService = inject(CookieService)
  const token = cookieService.get('auth_token');
  let userService = inject(AccountService)
  let router = inject(Router)
  if (userService.userData() === undefined) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
