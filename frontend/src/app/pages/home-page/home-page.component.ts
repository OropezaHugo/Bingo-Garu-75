import {Component, inject, OnInit} from '@angular/core';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import {RouterLink, RouterOutlet} from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import {GameService} from "../../core/services/game.service";

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
