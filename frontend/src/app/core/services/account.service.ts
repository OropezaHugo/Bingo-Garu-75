import {HttpClient, HttpParams} from '@angular/common/http';
import {inject, Injectable, signal} from '@angular/core';
import {AuthToken, User} from '../models/user';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = "http://localhost:5075/";
  private http = inject(HttpClient)
  currentUser = signal<User | null>(null)

  logout() {
    return this.http.post(this.baseUrl + 'Auth/logout', {})
  }
  login(values: any) {
    let params = new HttpParams()
    params = params.append('useCookies', true)
    return this.http.post<AuthToken>(this.baseUrl + 'login', values, {params})
  }

  getUserInfo() {
    return this.http.get<User>(this.baseUrl + 'Auth/user-info').pipe(
      map( user => {
        this.currentUser.set(user);
        console.log(user);
        return user;
      })
    )
  }
  getAuthState() {
    return this.http.get<{ isAuthenticated: boolean }>(this.baseUrl + 'Auth/auth-status')
  }
}
