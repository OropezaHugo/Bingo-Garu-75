import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';
import {SnackbarService} from '../services/snackbar.service';
import {inject} from '@angular/core';
import {NavigationExtras, Router} from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackBar = inject(SnackbarService);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 400) {
        if (err.error.errors) {
          const modelStareErrors = [];
          for (const key in err.error.errors) {
            modelStareErrors.push(err.error.errors[key])
          }
          throw modelStareErrors.flat();
        } else {
          snackBar.error(err.error.title || err.error)
        }
      }
      if (err.status === 401) {
        snackBar.error(err.error.title || err.error)
      }
      if (err.status === 409) {
        snackBar.error(err.error.title || err.error)
      }
      return throwError(() => err)
    })
  );
};
