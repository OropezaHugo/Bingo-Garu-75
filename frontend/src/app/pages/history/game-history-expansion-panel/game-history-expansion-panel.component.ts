import {Component, inject, input, OnInit} from '@angular/core';
import {HistoryService} from '../../../core/services/history.service';
import {PrizeData} from '../../../core/models/round';
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {PrizesBoardComponent} from '../../end-game/prizes-board/prizes-board.component';

@Component({
  selector: 'app-game-history-expansion-panel',
  imports: [
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    PrizesBoardComponent,
    MatExpansionPanelHeader
  ],
  templateUrl: './game-history-expansion-panel.component.html',
  styleUrl: './game-history-expansion-panel.component.scss'
})
export class GameHistoryExpansionPanelComponent implements OnInit {
  gameId = input.required<number>();
  historyService = inject(HistoryService);
  totalAmount= 0;
  ngOnInit() {
    this.historyService.getGamePrizesById(this.gameId()).subscribe({
      next: result => {
        result.forEach(prize => {
          this.totalAmount += prize.prizeAmount
        })
      }
    })
  }
}
