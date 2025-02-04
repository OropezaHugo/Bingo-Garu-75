import {Component, inject, input, OnInit} from '@angular/core';
import {GameService} from '../../../core/services/game.service';
import {RoundService} from '../../../core/services/round.service';
import {RoundPatternInfo} from '../../../core/models/add-pattern-dialog-data';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {SnackbarService} from '../../../core/services/snackbar.service';
import {MatButton} from '@angular/material/button';
import {PatternCardComponent} from '../../../shared/pattern-card/pattern-card.component';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-pattern-prizable',
  imports: [
    MatButton,
    MatLabel,
    PatternCardComponent,
    MatFormField,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './pattern-prizable.component.html',
  styleUrl: './pattern-prizable.component.scss'
})
export class PatternPrizableComponent implements OnInit {
  gameService = inject(GameService);
  roundService = inject(RoundService);
  roundId = input.required<number>()
  roundPattern = input.required<RoundPatternInfo>();
  amountForm = new FormControl<number>(0);
  snackBar = inject(SnackbarService);
  ngOnInit() {

    this.amountForm.setValue(this.roundPattern().targetPrice)
    this.roundService.getRounds()
  }

  updatePrize() {
    const latestValue = this.amountForm.value
    if (latestValue !== null) {
      this.roundService.updatePatternInRound({
        id: this.roundPattern().id,
        patternName: this.roundPattern().patternName,
        patternMatrix: this.roundPattern().patternMatrix,
        active: this.roundPattern().active,
        targetPrice: latestValue
      }, this.roundId()).subscribe()
      this.snackBar.success(`premio registrado: ${latestValue}Bs`)
    }
  }
}
