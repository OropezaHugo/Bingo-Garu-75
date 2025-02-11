import {Component, inject, input} from '@angular/core';
import {Game} from '../../../core/models/game';
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {DatePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';

@Component({
  selector: 'app-unstarted-games-panel',
  imports: [
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    DatePipe,
    MatButton
  ],
  templateUrl: './unstarted-games-panel.component.html',
  styleUrl: './unstarted-games-panel.component.scss'
})
export class UnstartedGamesPanelComponent {

  unstartedGame = input.required<Game>()
  router = inject(Router)
  loadGame() {
    localStorage.setItem('gameId', this.unstartedGame().id.toString())
    this.router.navigateByUrl('/bingo/lobby')
  }
}
