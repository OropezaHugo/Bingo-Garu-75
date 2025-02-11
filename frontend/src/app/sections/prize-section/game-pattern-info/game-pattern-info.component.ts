import {Component, inject, OnInit} from '@angular/core';
import {GameService} from '../../../core/services/game.service';
import { ReactiveFormsModule } from '@angular/forms';

import {RoundService} from '../../../core/services/round.service';
import {RoundPatternInfoComponent} from '../round-pattern-info/round-pattern-info.component';
import {MatTab, MatTabGroup} from '@angular/material/tabs';

@Component({
  selector: 'app-game-pattern-info',
  imports: [
    ReactiveFormsModule,

    RoundPatternInfoComponent,
    MatTabGroup,
    MatTab
  ],
  templateUrl: './game-pattern-info.component.html',
  styleUrl: './game-pattern-info.component.scss'
})
export class GamePatternInfoComponent implements OnInit {
  gameService = inject(GameService);
  roundService = inject(RoundService);
  ngOnInit() {
    this.roundService.getRounds()
  }


}
