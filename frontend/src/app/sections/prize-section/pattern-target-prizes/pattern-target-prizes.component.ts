import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {GameService} from '../../../core/services/game.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GamePatternInfoComponent} from '../game-pattern-info/game-pattern-info.component';
import {RoundService} from '../../../core/services/round.service';
import {MatStepperNext} from '@angular/material/stepper';

@Component({
  selector: 'app-pattern-target-prize-section',
  imports: [
    FormsModule,
    GamePatternInfoComponent,
    ReactiveFormsModule,
    MatButton,
    MatStepperNext
  ],
  templateUrl: './pattern-target-prizes.component.html',
  styleUrl: './pattern-target-prizes.component.scss'
})
export class PatternTargetPrizesComponent implements OnInit {
  gameService = inject(GameService);
  roundService = inject(RoundService)

  ngOnInit() {
    this.roundService.getRounds()
    this.gameService.getCardsByGameId()
  }

}
