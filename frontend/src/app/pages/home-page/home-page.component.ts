import {Component, inject, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import {CookieService} from 'ngx-cookie-service';
import {HttpUrlEncodingCodec} from '@angular/common/http';
import {AccountService} from '../../core/services/account.service';

@Component({
  selector: 'app-home-page',
    imports: [
      MatIconModule,
      RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {

    router = inject(Router)
    cookieService = inject(CookieService)
    httpUrlCodec = new HttpUrlEncodingCodec
    userService = inject(AccountService)
    ngOnInit(): void {
      let jwt = this.userService.getTokenData()
      if (jwt)
      this.userService.getActualUserInfo(jwt.email).subscribe({
        next: user => {

          this.router.navigateByUrl('')
        },
        error: error => {
          if (error.status === 401) {
            this.userService.logout()
          }
        }
      })
    }

}
