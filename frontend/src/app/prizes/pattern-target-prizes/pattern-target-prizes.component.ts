import {Component, inject, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {PatternCardComponent} from '../../shared/pattern-card/pattern-card.component';
import {GameService} from '../../core/services/game.service';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {GamePatternInfo} from '../../models/add-pattern-dialog-data';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {GamePatternInfoComponent} from '../game-pattern-info/game-pattern-info.component';
import {RectanglebuttonComponent} from '../../components/buttons/rectanglebutton/rectanglebutton.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirDialogComponent} from '../../shared/confir-dialog/confir-dialog.component';
import {Router} from '@angular/router';
import {RoundService} from '../../core/services/round.service';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-pattern-target-prizes',
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
  dialog = inject(MatDialog);
  router = inject(Router);

  roundsFormGroup = new FormGroup({
    roundNumber: new FormControl<number>(1, Validators.required),
    hasBonus: new FormControl<boolean>(false),
  })

  ngOnInit() {
    this.gameService.getActualGamePatternsInfo()
  }
  startGame() {
    let dialogRef = this.dialog.open(ConfirDialogComponent, {
      data: false
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.createRounds()
      }
    })
  }

  createRounds(){
    if (this.roundsFormGroup.value.roundNumber
    && this.roundsFormGroup.value.hasBonus !== undefined
      && this.roundsFormGroup.value.hasBonus !== null
    ) {

      this.roundService.postRounds({
        roundQuantity: this.roundsFormGroup.value.roundNumber,
        hasBonusRound: this.roundsFormGroup.value.hasBonus
      })
      this.gameService.updateGame({
        inProgress: true,
        finished: false,
        id: this.gameService.actualGame()!.id,
        automaticRaffle: this.gameService.actualGame()!.automaticRaffle,
        sharePrizes: this.gameService.actualGame()!.sharePrizes,
        randomPatterns: this.gameService.actualGame()!.randomPatterns,
      })
      this.router.navigate(['/game']);
    }
  }
}
