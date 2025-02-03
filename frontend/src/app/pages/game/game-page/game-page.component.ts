import {Component, inject, model, OnInit, signal} from '@angular/core';
import {MatTab, MatTabChangeEvent, MatTabGroup} from '@angular/material/tabs';
import {MockGameRounds, Round} from '../../../core/models/round';
import {RoundTabComponent} from '../round-tab/round-tab.component';
import {RoundRaffledNumbersComponent} from '../round-raffled-numbers/round-raffled-numbers.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {ConfirDialogComponent} from '../../../shared/dialogs/confir-dialog/confir-dialog.component';
import {GamePatternsListComponent} from '../game-patterns-list/game-patterns-list.component';
import {PatternTargetPrizesComponent} from '../../../sections/prize-section/pattern-target-prizes/pattern-target-prizes.component';
import {GamePatternInfoComponent} from '../../../sections/prize-section/game-pattern-info/game-pattern-info.component';
import {GameService} from '../../../core/services/game.service';
import {BingoCardComponent} from '../../../shared/bingo-card/bingo-card.component';
import {Card, CardBox, GameCardInfo} from '../../../core/models/card';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {SaleButtonComponent} from '../../../sections/sales-section/sale-button/sale-button.component';
import {RoundPatternInfo} from '../../../core/models/add-pattern-dialog-data';
import {VerifyCardDialogComponent} from '../verify-card-dialog/verify-card-dialog.component';
import {RoundService} from '../../../core/services/round.service';
import {delay} from 'rxjs';
import {Router} from '@angular/router';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {RoundPatternsListComponent} from '../round-patterns-list/round-patterns-list.component';
import {MatIcon} from '@angular/material/icon';
import {RounListInGameComponent} from '../roun-list-in-game/roun-list-in-game.component';

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
    SaleButtonComponent,
    ReactiveFormsModule,
    RoundPatternsListComponent,
    MatIconButton,
    MatIcon,
    RounListInGameComponent
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
  router = inject(Router)
  activePatterns: RoundPatternInfo[] = []
  activeRound: Round | undefined = undefined
  actualTab = 0;
  cardForm = new FormControl<string>('')


  ngOnInit() {
    this.roundService.getRounds()
    this.gameService.getCardsByGameId()
    this.rounds = this.roundService.actualRounds();
    this.activeRound = this.roundService.actualRounds()[0]
    this.rounds.forEach(() => {this.disableRounds.push(false);});
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
        .filter(card =>
            card.cardNumber.toString().includes(this.cardForm.value?.toString() ?? ''))
  }
  endRound(index: number) {
    let dialogRef = this.dialog.open(ConfirDialogComponent, {
        data: false
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.disableRounds[index] = true;
        this.actualTab = index + 1;
      }
    })
  }
  switchActivePattern(pattern: RoundPatternInfo) {
    pattern.active = !pattern.active;

    if (pattern.active) {
      this.activePatterns.push(pattern);
    } else {
      this.activePatterns = this.activePatterns.filter(value => value !== pattern);
    }
  }


  verifyCardDialog(card: GameCardInfo) {
    this.roundService.getRounds()
    this.rounds = this.roundService.actualRounds();
    this.activeRound = this.roundService.actualRounds().find(round => round.id == this.activeRound?.id)
    this.roundService.getPatternsInfoByRoundId(this.activeRound!.id!).subscribe( {
      next: result => {
        if (result) {
          this.dialog.open(VerifyCardDialogComponent, {
            data: {
              card: card,
              raffledNumbers: this.activeRound?.raffleNumbers ?? [],
              patterns: result.filter(pattern => pattern.active),
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
      }
    })

  }
  loadRound(event: MatTabChangeEvent) {
    this.rounds = this.roundService.actualRounds();
    this.activeRound = this.rounds[event.index];
    this.roundService.getPatternsInfoByRoundId(this.activeRound!.id!).subscribe( {
      next: result => {
        if (result) {
          this.activePatterns = result
        }
      }
    })
  }
  finishGame(){
    let dialogRef = this.dialog.open(ConfirDialogComponent, {
      data: false
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.gameService.finishGame()
        this.router.navigate(['/prizes'], {replaceUrl: true});
      }
    })
  }

  protected readonly location = location;
}
