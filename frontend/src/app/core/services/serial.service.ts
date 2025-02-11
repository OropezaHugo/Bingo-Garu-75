import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { SerialColorsDTO } from '../models/ColorSerials';
import {NewSerialData, Serial} from '../models/serial';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SerialService {

  baseUrl = environment.apiUrl;
  private http = inject(HttpClient)

  getSerials() {
    return this.http.get<Serial[]>(`${this.baseUrl}Serial`)
  }


  createSerial(serial: NewSerialData) {
    return this.http.post<boolean>(`${this.baseUrl}Serial/cards`, serial)
  }
}
