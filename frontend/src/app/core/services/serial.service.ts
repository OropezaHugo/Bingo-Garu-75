import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Serial} from '../../models/serial';

@Injectable({
  providedIn: 'root'
})
export class SerialService {

  baseUrl = "http://localhost:5075/";
  private http = inject(HttpClient)

  getSerials() {
    return this.http.get<Serial[]>(`${this.baseUrl}Serial`)
  }
}
