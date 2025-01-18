import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Serial} from '../../models/serial';
import {SerialColorsDTO} from '../../models/colorSerial';

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
}
