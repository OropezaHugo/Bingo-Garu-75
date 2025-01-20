import {Component, inject, model, OnInit} from '@angular/core';
import {MatTab, MatTabChangeEvent, MatTabGroup} from '@angular/material/tabs';
import {MockGameRounds, Round} from '../../models/round';
import {RoundTabComponent} from '../round-tab/round-tab.component';
import {RoundRaffledNumbersComponent} from '../round-raffled-numbers/round-raffled-numbers.component';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {ConfirDialogComponent} from '../../shared/confir-dialog/confir-dialog.component';
import {GamePatternsListComponent} from '../../lobby/game-patterns-list/game-patterns-list.component';
import {PatternTargetPrizesComponent} from '../../prizes/pattern-target-prizes/pattern-target-prizes.component';
import {GamePatternInfoComponent} from '../../prizes/game-pattern-info/game-pattern-info.component';
import {GameService} from '../../core/services/game.service';
import {BingoCardComponent} from '../../shared/bingo-card/bingo-card.component';
import {Card, CardBox, GameCardInfo} from '../../models/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {SaleButtonComponent} from '../../sales/sale-button/sale-button.component';
import {GamePatternInfo} from '../../models/add-pattern-dialog-data';
import {VerifyCardDialogComponent} from '../verify-card-dialog/verify-card-dialog.component';
import {RoundService} from '../../core/services/round.service';
import {delay} from 'rxjs';

@Component({
  selector: 'app-game-page',
  imports: [
    MatTabGroup,
    MatTab,
    RoundTabComponent,
    RoundRaffledNumbersComponent,
    MatButton,
    GamePatternsListComponent,
    PatternTargetPrizesComponent,
    GamePatternInfoComponent,
    BingoCardComponent,
    MatFormField,
    MatLabel,
    MatInput,
    MatPaginator,
    SaleButtonComponent
  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent implements OnInit {

  pageSize = model<number>(25);
  pageIndex = model<number>(0);
  pageSizeOptions = [15, 25, 40];
  rounds: Round[] = []
  disableRounds: boolean[] = []
  dialog = inject(MatDialog);
  gameService = inject(GameService)
  roundService = inject(RoundService)
  activePatterns: GamePatternInfo[] = []
  activeRound: Round | undefined = undefined


  ngOnInit() {
    this.roundService.getRounds()
    this.gameService.getCardsByGameId()
    this.gameService.getActualGamePatternsInfo()
    this.rounds = this.roundService.actualRounds();
    this.activeRound = this.roundService.actualRounds()[0]
    this.rounds.forEach(() => {this.disableRounds.push(false);});
    this.activePatterns = this.gameService.gamePatternsInfo()
      .filter(pattern => pattern.active)
    this.updateLocalPagination({
      pageIndex: 0,
      pageSize: 15,
      previousPageIndex: 1,
      length: this.gameService.gameCards().length
    })
  }
  updateLocalPagination(event: PageEvent){
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
  }
  getPaginatedList() {
    return this.gameService.gameCards()
      .slice(this.pageIndex() * this.pageSize(),
        (this.pageIndex() * this.pageSize()) + this.pageSize())
  }
  endRound(index: number) {
    let dialogRef = this.dialog.open(ConfirDialogComponent, {
        data: false
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.disableRounds[index] = true;
      }
    })
  }
  switchActivePattern(pattern: GamePatternInfo) {
    pattern.active = !pattern.active;
    this.gameService.updateGamePatternInfo(pattern)
    if (pattern.active) {
      this.activePatterns.push(pattern);
    } else {
      this.activePatterns = this.activePatterns.filter(value => value !== pattern);
    }
  }


  verifyCardDialog(card: GameCardInfo) {
    this.rounds = this.roundService.actualRounds();
    this.activeRound = this.roundService.actualRounds().find(round => round.id == this.activeRound?.id)
    this.activePatterns = this.gameService.gamePatternsInfo()
      .filter(pattern => pattern.active)
    this.dialog.open(VerifyCardDialogComponent, {
      data: {
        card: card,
        raffledNumbers: this.activeRound?.raffleNumbers,
        patterns: this.activePatterns,
        roundId: this.activeRound?.id
      },
      minHeight: '600px',
      minWidth: '400px',
      maxWidth: '400px',
      position: {
        top: '0'
      }
    })
  }
  loadRound(event: MatTabChangeEvent) {
    this.rounds = this.roundService.actualRounds();
    this.activeRound = this.rounds[event.index];
  }
}
