import {APP_INITIALIZER, ApplicationConfig, provideAppInitializer, provideZoneChangeDetection} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {errorInterceptor} from './core/interceptors/error.interceptor';
import {InitService} from './core/services/init.service';
import {firstValueFrom, lastValueFrom} from 'rxjs';

function initializeApp(initService: InitService){
  return () => firstValueFrom(initService.init())
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([
      errorInterceptor
    ])),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [InitService]
    }
  ]
};
