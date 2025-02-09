import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-page',
    imports: [
      MatIconModule,
      RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
