import {Component, inject, OnInit, signal} from '@angular/core';
import {MatTab, MatTabChangeEvent, MatTabGroup} from '@angular/material/tabs';
import {Round} from '../../../core/models/round';
import {RoundTabComponent} from '../round-tab/round-tab.component';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {ConfirDialogComponent} from '../../../shared/dialogs/confir-dialog/confir-dialog.component';
import {GameService} from '../../../core/services/game.service';
import {GameCardInfo} from '../../../core/models/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {SaleButtonComponent} from '../../../sections/sales-section/sale-button/sale-button.component';
import {RoundPatternInfo} from '../../../core/models/add-pattern-dialog-data';
import {VerifyCardDialogComponent} from '../verify-card-dialog/verify-card-dialog.component';
import {RoundService} from '../../../core/services/round.service';
import {Router} from '@angular/router';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {RounListInGameComponent} from '../roun-list-in-game/roun-list-in-game.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {RoundPrizesBoardComponent} from '../round-prizes-board/round-prizes-board.component';

@Component({
  selector: 'app-game-page',
  imports: [
    MatTabGroup,
    MatTab,
    RoundTabComponent,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    SaleButtonComponent,
    ReactiveFormsModule,

    RounListInGameComponent,

  ],
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent implements OnInit {


  dialog = inject(MatDialog);
  gameService = inject(GameService)
  roundService = inject(RoundService)
  router = inject(Router)
  activePatterns: RoundPatternInfo[] = []
  activeRound = signal<Round | undefined>(undefined)
  actualTab = 0;
  cardForm = new FormControl<string>('')
  bottomSheet = inject(MatBottomSheet);

  ngOnInit() {
    this.gameService.createNewGame().subscribe({
      next: result => {
        if (this.gameService.actualGame()?.finished) {
          this.router.navigateByUrl('bingo/prizes');
        }
        this.roundService.getRounds()
        this.gameService.getCardsByGameId()
      }
    })

  }
  nextRound(index: number) {
    this.actualTab = index + 1;
  }
  getPaginatedList() {
    return this.gameService.gameCards()
        .filter(card =>
            card.cardNumber.toString().includes(this.cardForm.value?.toString() ?? ''))
  }
  endRound(round: Round, index: number) {
    let dialogRef = this.dialog.open(ConfirDialogComponent, {
        data: false
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.actualTab = index + 1;
        round.active = false
        this.roundService.updateRoundData(round);
      }
    })
  }


  verifyCardDialog(card: GameCardInfo) {
    this.roundService.getRounds()
    if (this.activeRound() === undefined) {
      this.activeRound.set(this.roundService.actualRounds()[this.actualTab]);
    }
    this.activeRound.set(this.roundService.actualRounds().find(round => round.id == this.activeRound()?.id))
    this.roundService.getPatternsInfoByRoundId(this.activeRound()!.id!).subscribe( {
      next: result => {
        if (result) {
          this.dialog.open(VerifyCardDialogComponent, {
            data: {
              card: card,
              raffledNumbers: this.activeRound()?.raffleNumbers ?? [],
              patterns: result.filter(pattern => pattern.active),
              round: this.activeRound()
            },
            minHeight: '600px',
            minWidth: '400px',
            maxWidth: '400px',
            position: {
              top: '0',
              right: '0',
            }
          })
        }
      }
    })
  }

  openBottomPrizes(round: Round) {
    this.bottomSheet.open(RoundPrizesBoardComponent, {
      data: round,
      maxHeight: '400px'
    })
  }
  loadRound(event: MatTabChangeEvent) {
    this.activeRound.set(this.roundService.actualRounds()[event.index]);
    this.roundService.getPatternsInfoByRoundId(this.activeRound()!.id!).subscribe( {
      next: result => {
        if (result) {
          this.activePatterns = result
        }
      }
    })
    this.roundService.refreshPatterns(this.activeRound()!.id!)
  }
  finishGame(){
    let dialogRef = this.dialog.open(ConfirDialogComponent, {
      data: false
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.gameService.finishGame()
        this.router.navigate(['/bingo/prizes'], {replaceUrl: true});
      }
    })
  }

  protected readonly location = location;
}
