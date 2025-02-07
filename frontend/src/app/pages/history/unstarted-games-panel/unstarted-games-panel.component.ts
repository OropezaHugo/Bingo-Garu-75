import {Component, inject, input, OnInit} from '@angular/core';
import {HistoryService} from '../../../core/services/history.service';
import {Game} from '../../../core/models/game';
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {PrizesBoardComponent} from '../../end-game/prizes-board/prizes-board.component';
import {DatePipe} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {GameService} from '../../../core/services/game.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-unstarted-games-panel',
  imports: [
    MatExpansionPanel,
    MatExpansionPanelDescription,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    PrizesBoardComponent,
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
    this.router.navigateByUrl('/lobby')
  }
}
