import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  baseUrl = "http://localhost:5075/";
  private http = inject(HttpClient)
  getWeather(){
    return this.http.get(this.baseUrl + 'WeatherForecast');
  }
}
