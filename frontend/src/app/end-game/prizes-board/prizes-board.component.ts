import {Component, inject, input, OnInit} from '@angular/core';
import {GameService} from '../../core/services/game.service';
import {PrizeData} from '../../models/round';
import {PrizesRowComponent} from '../prizes-row/prizes-row.component';
import {Router} from '@angular/router';
import {RoundService} from '../../core/services/round.service';
import {MatDivider} from '@angular/material/divider';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {ConfirDialogComponent} from '../../shared/confir-dialog/confir-dialog.component';
import {HistoryService} from '../../core/services/history.service';

@Component({
  selector: 'app-prizes-board',
  imports: [
    PrizesRowComponent,
    MatDivider,
    MatButton
  ],
  templateUrl: './prizes-board.component.html',
  styleUrl: './prizes-board.component.scss'
})
export class PrizesBoardComponent implements OnInit {
  gameService = inject(GameService);
  roundService = inject(RoundService)
  historyService = inject(HistoryService)
  forActualGame = input<boolean>(true)
  gameId = input<number>(1);
  gamePrizes: PrizeData[] = []
  router = inject(Router)
  dialog = inject(MatDialog)
  ngOnInit() {
    this.gameService.getActualGamePrizes()
    this.gameService.getActualGamePatternsInfo()
    this.roundService.getRounds()
    if (this.gameId() !== undefined) {
      this.historyService.getGamePrizesById(this.gameId()).subscribe({
        next: result => {
          this.gamePrizes = result
        }
      })
    }
  }
  leaveGame() {
    this.dialog.open(ConfirDialogComponent, {
      data: false
    }).afterClosed().subscribe({
      next: result => {
        if (result === true) {
          this.gameService.disposeActualGame()
          this.router.navigate(['/'], {replaceUrl: true});
        }
      }
    })
  }
}