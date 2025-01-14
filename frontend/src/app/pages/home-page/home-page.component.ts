import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home-page',
    imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}