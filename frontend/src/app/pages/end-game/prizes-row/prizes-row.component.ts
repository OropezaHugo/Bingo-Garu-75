import {Component, inject, input, OnInit} from '@angular/core';
import {PatternCardComponent} from '../../../shared/pattern-card/pattern-card.component';
import {GamePatternInfo} from '../../../core/models/add-pattern-dialog-data';
import {PrizeData} from '../../../core/models/round';
import {GameService} from '../../../core/services/game.service';
import {RoundService} from '../../../core/services/round.service';
import {PatternService} from '../../../core/services/pattern.service';

@Component({
  selector: 'app-prizes-row',
  imports: [
    PatternCardComponent
  ],
  templateUrl: './prizes-row.component.html',
  styleUrl: './prizes-row.component.scss'
})
export class PrizesRowComponent implements OnInit {
  gameService = inject(GameService)
  roundService = inject(RoundService)
  patternService = inject(PatternService)
  prizeData = input.required<PrizeData>()
  prizeRound = ''
  patternMatrix: boolean[] = []

  ngOnInit() {
    this.getPrizeRoundName()
    this.getPrizeRowPattern()
  }

  getPrizeRowPattern() {
    this.patternService.getPatternById(this.prizeData().patternId).subscribe({
      next: value => {
        this.patternMatrix = value.patternMatrix
      }
    })
  }

  getPrizeRoundName() {
    this.roundService.getRoundsById(this.prizeData().roundId).subscribe({
      next: result => {
        this.prizeRound = result.roundName
      }
    })
  }
}
