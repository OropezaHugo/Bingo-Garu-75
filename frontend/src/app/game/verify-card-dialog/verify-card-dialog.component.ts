import {Component, inject, model} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose, MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {PrizeData, Round, VerifyCardDialogData} from '../../models/round';
import {BingoCardComponent} from '../../shared/bingo-card/bingo-card.component';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {RoundService} from '../../core/services/round.service';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatOption, MatSelect} from '@angular/material/select';
import {GameService} from '../../core/services/game.service';
import {MatAutocomplete, MatAutocompleteTrigger} from '@angular/material/autocomplete';
import {Card, GameCardInfo} from '../../models/card';
import {GamePatternInfo} from '../../models/add-pattern-dialog-data';

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
  roundService = inject(RoundService);
  machineResponse = "no verificado";
  gameService = inject(GameService);
  prizeFormGroup = new FormGroup({
    patternControl: new FormControl<GamePatternInfo | undefined>(undefined, Validators.required),
    userNameControl: new FormControl<string>(this.verificationData().card.userName, [Validators.required, Validators.minLength(3)]),
    amountControl: new FormControl<number>(0, Validators.required)
  })

  mapCard(card: GameCardInfo): Card {
    return {
      cardNumber: card.cardNumber,
      content: card.contentMatrix.map(value => ({
        number: value,
        marked: this.verificationData().raffledNumbers.includes(value)
      }))
    }
  }

  verifyWithMachine() {
    this.machineResponse = 'Bingo valido para patrones:\n'
    this.verificationData().patterns.forEach(pattern => {
      if (this.roundService.isBingoValid(
        pattern.patternMatrix,
        this.verificationData().card.contentMatrix,
        this.verificationData().raffledNumbers
        ))
      {
        this.machineResponse += (pattern.patternName + '.\n ')
      }
    })
  }

  givePrize() {
    if (this.prizeFormGroup.value.patternControl
    && this.prizeFormGroup.value.userNameControl
    && this.prizeFormGroup.value.userNameControl.trim().length > 3) {
      this.roundService.postPrize({
        cardId: this.verificationData().card.cardId,
        roundId: this.verificationData().roundId,
        patternId: this.prizeFormGroup.value.patternControl.id,
        prizeAmount: this.prizeFormGroup.value.amountControl!,
        userName: this.prizeFormGroup.value.userNameControl
      }).subscribe()
    }
    return
  }
}
