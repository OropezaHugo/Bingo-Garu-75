import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  let cookieService = inject(CookieService)
  const router = inject(Router);
  let token = cookieService.get('auth')

  if (token.length > 10) {
    return true
  }
  router.navigateByUrl('/login')
  return false;
};
