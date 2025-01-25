import {Component, inject, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {PatternCardComponent} from '../../../shared/pattern-card/pattern-card.component';
import {GameService} from '../../../core/services/game.service';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {GamePatternInfo} from '../../../core/models/add-pattern-dialog-data';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {GamePatternInfoComponent} from '../game-pattern-info/game-pattern-info.component';
import {RectanglebuttonComponent} from '../../../shared/buttons/rectanglebutton/rectanglebutton.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirDialogComponent} from '../../../shared/dialogs/confir-dialog/confir-dialog.component';
import {Router} from '@angular/router';
import {RoundService} from '../../../core/services/round.service';
import {MatCheckbox} from '@angular/material/checkbox';
import {SnackbarService} from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-pattern-target-prize-section',
  imports: [
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatLabel,
    PatternCardComponent,
    MatFormField,
    MatInput,
    FormsModule,
    GamePatternInfoComponent,
    RectanglebuttonComponent,
    ReactiveFormsModule,
    MatCheckbox
  ],
  templateUrl: './pattern-target-prizes.component.html',
  styleUrl: './pattern-target-prizes.component.scss'
})
export class PatternTargetPrizesComponent implements OnInit {
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

  ngOnInit() {
    this.gameService.getActualGamePatternsInfo()
  }
  startGame() {
    if(this.gameService.gameCards().length > 0 &&
        this.gameService.gamePatternsInfo().length > 0)
    {

      let dialogRef = this.dialog.open(ConfirDialogComponent, {
        data: false
      })
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.createRounds()
        }
      })
    } else {
      this.snackBar.error('adjunte un serial y un patron para iniciar la partida')
    }

  }

  createRounds(){
    if (this.roundsFormGroup.value.roundNumber
    && this.roundsFormGroup.value.hasBonus !== undefined
      && this.roundsFormGroup.value.hasBonus !== null
        && this.roundsFormGroup.value.automaticRaffle !== undefined
        && this.roundsFormGroup.value.automaticRaffle !== null
    ) {
      if (this.gameService.gameCards().length < 1) {
        this.snackBar.error('Primero adjunta un serial a la partida actual')
      }
      if (this.gameService.gamePatternsInfo().length < 1) {
        this.snackBar.error('Primero adjunta al menos 1 patron a la partida actual')
      }
      this.roundService.postRounds({
        roundQuantity: this.roundsFormGroup.value.roundNumber,
        hasBonusRound: this.roundsFormGroup.value.hasBonus
      })
      this.gameService.updateGame({
        inProgress: true,
        finished: false,
        id: this.gameService.actualGame()!.id,
        automaticRaffle: this.roundsFormGroup.value.automaticRaffle,
        sharePrizes: this.gameService.actualGame()!.sharePrizes,
        randomPatterns: this.gameService.actualGame()!.randomPatterns,
      })
      this.router.navigate(['/game']);
    }
  }
}
