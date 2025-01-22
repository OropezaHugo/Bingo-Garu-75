import {Component, inject, input, model, OnInit, signal} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {PatternCardComponent} from "../../../shared/pattern-card/pattern-card.component";
import {GamePatternInfo} from '../../../core/models/add-pattern-dialog-data';
import {GameService} from '../../../core/services/game.service';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatTooltip} from '@angular/material/tooltip';

@Component({
  selector: 'app-game-pattern-info',
  imports: [
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    PatternCardComponent,
    ReactiveFormsModule,
    MatTooltip
  ],
  templateUrl: './game-pattern-info.component.html',
  styleUrl: './game-pattern-info.component.scss'
})
export class GamePatternInfoComponent implements OnInit {
  gameService = inject(GameService);
  gamePattern = input.required<GamePatternInfo>()
  editablePrize = input<boolean>(true);
  amountForm = new FormControl<number>(0);

  ngOnInit() {
    this.amountForm.setValue(this.gamePattern().targetPrice)
  }
  updatePrize(){
    const latestValue = this.amountForm.value
    if (latestValue !== null) {
      this.gameService.updateGamePatternInfo({
        id: this.gamePattern().id,
        patternName: this.gamePattern().patternName,
        patternMatrix: this.gamePattern().patternMatrix,
        active: this.gamePattern().active,
        targetPrice: latestValue
      })
    }
  }
}
