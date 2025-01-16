import {Component, inject, OnInit} from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
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
export class HomePageComponent implements OnInit {
  gameService = inject(GameService)

  ngOnInit() {
    if (this.gameService.actualGame()){
      console.log("asdasdasd")
    }
  }
}
