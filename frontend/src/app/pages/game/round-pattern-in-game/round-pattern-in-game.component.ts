import {Component, inject, input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PatternCardComponent} from '../../../shared/pattern-card/pattern-card.component';
import {RoundPatternInfo} from '../../../core/models/add-pattern-dialog-data';
import {RoundService} from '../../../core/services/round.service';

@Component({
  selector: 'app-round-pattern-in-game',
  imports: [
    PatternCardComponent
  ],
  templateUrl: './round-pattern-in-game.component.html',
  styleUrl: './round-pattern-in-game.component.scss'
})
export class RoundPatternInGameComponent implements OnInit, OnChanges{
  pattern = input.required<RoundPatternInfo>()
  roundId = input.required<number>()
  roundService = inject(RoundService)
  hasWinner = false;
  ngOnInit() {
    this.roundService.existsAnyWinnerInRoundPattern(this.roundId(), this.pattern().id).subscribe({
      next: result => {

        this.hasWinner = result;
      }
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    this.roundService.existsAnyWinnerInRoundPattern(this.roundId(), this.pattern().id).subscribe({
      next: result => {

        this.hasWinner = result;
      }
    })
  }
}
