import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AccountService} from '../services/account.service';
import {map, of} from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService)
  const router = inject(Router);
  if (accountService.currentUser()) {
    return of(true);
  } else {
    return accountService.getAuthState().pipe(
      map(val => {
        if (val.isAuthenticated) {
          return true
        } else {
          router.navigate(['/login']);
          return false
        }
      })
    )
  }

};
