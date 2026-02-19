import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {AuthToken, GoogleUserInfo, LoginVal, User} from '../models/user';
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

  baseUrl = environment.apiUrl;
  private http = inject(HttpClient)
  cookieService = inject(CookieService)
  userData = signal<User | undefined>(undefined)
  tokenData = signal<GoogleUserInfo | undefined>(undefined)
  getActualUserInfo(email: string) {
    return this.http.get<User>(`${this.baseUrl}Auth/email/${email}`).pipe(
      map(res => {
        this.userData.set(res)
      }),
    )
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.baseUrl}/User/${id}`)
  }
  getTokenData() {
    let value = this.cookieService.get('auth_token')
    if (value.length > 2) {
      let jwtString = atob(value.split('.')[1]);
      let jwt: GoogleUserInfo = JSON.parse(jwtString)
      this.tokenData.set(jwt)
      return this.tokenData()
    }
    return undefined
  }

  logout(){
    this.cookieService.delete('auth_token', '/', undefined, false, 'Lax')
    window.location.reload()
  }

}
