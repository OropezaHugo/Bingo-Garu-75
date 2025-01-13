import {Component, inject, OnInit} from '@angular/core';
import {WeatherService} from './core/services/weather.service';
import { HomePageComponent } from './pages/home-page/home-page.component';


@Component({
  selector: 'app-root',
  imports: [HomePageComponent],
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
