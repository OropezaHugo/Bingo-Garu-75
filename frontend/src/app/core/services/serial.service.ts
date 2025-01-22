import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { SerialColorsDTO } from '../models/ColorSerials';
import {NewSerialData, Serial} from '../models/serial';

@Injectable({
  providedIn: 'root'
})
export class SerialService {

  baseUrl = "http://localhost:5075/";
  private http = inject(HttpClient)

  getSerials() {
    return this.http.get<Serial[]>(`${this.baseUrl}Serial`)
  }


  getColorsSerial(id: number) {
    return this.http.get<SerialColorsDTO>(`${this.baseUrl}serial/colors/${id}`);
  }

  createSerial(serial: NewSerialData) {
    return this.http.post<boolean>(`${this.baseUrl}Serial/cards`, serial)
  }
}
