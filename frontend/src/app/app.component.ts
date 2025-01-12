import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {WeatherService} from './core/services/weather.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  weatherService = inject(WeatherService);
  ngOnInit() {
    this.weatherService.getWeather().subscribe({
      next: (weather) => {
        console.log(weather);
      }
    })
  }
}
