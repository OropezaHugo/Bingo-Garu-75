import {Component, inject, OnInit} from '@angular/core';
import {WeatherService} from './core/services/weather.service';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from "./shared/header/header.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
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
