import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { SerialColorsDTO } from '../models/ColorSerials';
import {NewSerialData, Serial} from '../models/serial';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SerialService {

  baseUrl = environment.apiUrl;
  private http = inject(HttpClient)
  serial = signal<Serial | undefined>(undefined)

  getSerials() {
    return this.http.get<Serial[]>(`${this.baseUrl}Serial`)
  }
  getSerialById(serialId: number) {
    return this.http.get<Serial>(`${this.baseUrl}Serial/${serialId}`)
  }

  createSerial(serial: NewSerialData) {
    return this.http.post<boolean>(`${this.baseUrl}Serial/cards`, serial)
  }
  updateSerial(serial: Serial) {
    return this.http.put<Serial>(`${this.baseUrl}Serial/${serial.id}`, serial).pipe(
      map((result) => {
      if (result) {
        this.serial.set(result)
      }
    })
    )
  }
}
