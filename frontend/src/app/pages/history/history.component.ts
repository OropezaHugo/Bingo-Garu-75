import {Component, inject, OnInit} from '@angular/core';
import {HistoryService} from '../../core/services/history.service';
import {Game} from '../../models/game';
import {PrizeData} from '../../models/round';
import {
  GameHistoryExpansionPanelComponent
} from './game-history-expansion-panel/game-history-expansion-panel.component';
import {PrizesBoardComponent} from '../../end-game/prizes-board/prizes-board.component';

@Component({
  selector: 'app-history',
  imports: [
    GameHistoryExpansionPanelComponent,
    PrizesBoardComponent
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit {
  historyService = inject(HistoryService)
  historyGames: Game[] = []
  ngOnInit() {
    this.historyService.getAllFinishedGames().subscribe({
      next: result => {
        this.historyGames = result
      }
    })
  }

}
