import {Component, inject, model} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {Round, VerifyCardDialogData} from '../../../core/models/round';
import {BingoCardComponent} from '../../../shared/bingo-card/bingo-card.component';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {RoundService} from '../../../core/services/round.service';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatOption, MatSelect} from '@angular/material/select';
import {GameService} from '../../../core/services/game.service';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {Card, GameCardInfo} from '../../../core/models/card';
import {RoundPatternInfo} from '../../../core/models/add-pattern-dialog-data';
import {SnackbarService} from '../../../core/services/snackbar.service';
import {RoundPrizesBoardComponent} from '../round-prizes-board/round-prizes-board.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-verify-card-dialog',
  imports: [
    BingoCardComponent,
    MatDialogTitle,
    MatLabel,
    MatInput,
    FormsModule,
    MatDialogActions,
    MatButton,
    MatHint,
    MatDialogContent,
    MatFormField,
    MatTabGroup,
    MatTab,
    MatSelect,
    MatOption,
    MatAutocompleteTrigger,
    MatAutocomplete,
    ReactiveFormsModule
  ],
  templateUrl: './verify-card-dialog.component.html',
  styleUrl: './verify-card-dialog.component.scss'
})
export class VerifyCardDialogComponent {
  readonly dialogRef = inject(MatDialogRef<VerifyCardDialogComponent>);
  readonly data = inject<VerifyCardDialogData>(MAT_DIALOG_DATA);
  readonly verificationData = model(this.data);
  snackBar = inject(SnackbarService)
  roundService = inject(RoundService);
  machineResponse = "no verificado";
  gameService = inject(GameService);
  bottomSheet = inject(MatBottomSheet);
  prizeFormGroup = new FormGroup({
    patternControl: new FormControl<RoundPatternInfo | undefined>(undefined, Validators.required),
    userNameControl: new FormControl<string>(this.verificationData().card.userName, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    amountControl: new FormControl<number>(0, Validators.required)
  })

  mapCard(card: GameCardInfo): Card {
    return {
      cardNumber: card.cardNumber,
      content: card.contentMatrix.map(value => ({
        number: value,
        marked: this.verificationData().raffledNumbers.includes(value),
      })),
      lastNumber: this.verificationData().raffledNumbers[this.verificationData().raffledNumbers.length - 1],
    }
  }

  verifyWithMachine() {
    this.machineResponse = 'Bingo valido para patrones:\n'
    this.verificationData().patterns.forEach(pattern => {
      if (this.roundService.isBingoValidAndNotPassed(
        pattern.patternMatrix,
        this.verificationData().card.contentMatrix,
        this.verificationData().raffledNumbers
        ))
      {
        this.machineResponse += (`"${pattern.patternName}".\n`)
      }
      else if (this.roundService.isBingoValid(
        pattern.patternMatrix,
        this.verificationData().card.contentMatrix,
        this.verificationData().raffledNumbers
      )) {
        this.machineResponse += (`"${pattern.patternName}"  PISADO.\n`)
      }
    })
  }

  givePrize() {
    if (this.prizeFormGroup.value.patternControl
    && this.prizeFormGroup.value.userNameControl
    && this.prizeFormGroup.value.userNameControl.trim().length > 3) {
      this.roundService.postPrize({
        cardId: this.verificationData().card.cardId,
        roundId: this.verificationData().round.id!,
        patternId: this.prizeFormGroup.value.patternControl.id,
        prizeAmount: this.prizeFormGroup.value.amountControl!,
        userName: this.prizeFormGroup.value.userNameControl
      })
      this.roundService.updatePatternInRound({
        id: this.prizeFormGroup.value.patternControl.id,
        active: this.gameService.actualGame()?.sharePrizes ?? false,
        patternMatrix: this.prizeFormGroup.value.patternControl.patternMatrix,
        patternName: this.prizeFormGroup.value.patternControl.patternName,
        targetPrice: this.prizeFormGroup.value.patternControl.targetPrice,
      }, this.verificationData().round.id!).subscribe({
        next: result => {}
      })
      this.snackBar.success('premio registrado')
      this.dialogRef.close()
    }
    return
  }

  openBottomPrizes(round: Round) {
    this.bottomSheet.open(RoundPrizesBoardComponent, {
      data: round,
      maxHeight: '400px'
    })
  }
}
