import {Component, inject, OnInit} from '@angular/core';
import {HistoryService} from '../../core/services/history.service';
import {Game} from '../../core/models/game';
import {PrizeData} from '../../core/models/round';
import {
  GameHistoryExpansionPanelComponent
} from './game-history-expansion-panel/game-history-expansion-panel.component';
import {PrizesBoardComponent} from '../end-game/prizes-board/prizes-board.component';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {UnstartedGamesPanelComponent} from './unstarted-games-panel/unstarted-games-panel.component';

@Component({
  selector: 'app-history',
  imports: [
    GameHistoryExpansionPanelComponent,
    PrizesBoardComponent,
    MatTabGroup,
    MatTab,
    UnstartedGamesPanelComponent
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {
  historyService = inject(HistoryService)
  historyGames: Game[] = []
  unstartedGames: Game[] = []
  ngOnInit() {
    this.historyService.getAllFinishedGames().subscribe({
      next: result => {
        this.historyGames = result
      }
    })

    this.historyService.getAllUnstartedGames().subscribe({
      next: result => {
        this.unstartedGames = result
      }
    })
  }

}
