import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home-page',
    imports: [HeaderComponent,
      FooterComponent,
      RouterOutlet,
      MatIconModule,
      RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
