import {Component, inject} from '@angular/core';
import {GameService} from '../../core/services/game.service';
import {RoundService} from '../../core/services/round.service';
import {SnackbarService} from '../../core/services/snackbar.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatButton} from '@angular/material/button';
import {ConfirDialogComponent} from '../../shared/dialogs/confir-dialog/confir-dialog.component';

@Component({
  selector: 'app-game-configuration',
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatCheckbox,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './game-configuration.component.html',
  styleUrl: './game-configuration.component.scss'
})
export class GameConfigurationComponent {

  gameService = inject(GameService);
  roundService = inject(RoundService);
  snackBar = inject(SnackbarService);
  dialog = inject(MatDialog);
  router = inject(Router);

  roundsFormGroup = new FormGroup({
    roundNumber: new FormControl<number>(1, Validators.required),
    hasBonus: new FormControl<boolean>(false),
    automaticRaffle: new FormControl<boolean>(false),
  })
  createRounds(){
    this.dialog.open(ConfirDialogComponent, {
      data: false
    }).afterClosed().subscribe(result => {
      if (result) {
        if (this.roundsFormGroup.value.roundNumber
          && this.roundsFormGroup.value.hasBonus !== undefined
          && this.roundsFormGroup.value.hasBonus !== null
          && this.roundsFormGroup.value.automaticRaffle !== undefined
          && this.roundsFormGroup.value.automaticRaffle !== null
        ) {
          this.roundService.postRounds({
            roundQuantity: this.roundsFormGroup.value.roundNumber,
            hasBonusRound: this.roundsFormGroup.value.hasBonus
          })
          this.gameService.updateGame({
            inProgress: false,
            finished: false,
            id: this.gameService.actualGame()!.id,
            automaticRaffle: this.roundsFormGroup.value.automaticRaffle,
            sharePrizes: this.gameService.actualGame()!.sharePrizes,
            randomPatterns: this.gameService.actualGame()!.randomPatterns,
          })
        }
      }
    })
  }
}
