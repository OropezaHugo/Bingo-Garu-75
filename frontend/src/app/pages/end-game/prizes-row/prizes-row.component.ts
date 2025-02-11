import {Component, inject, input, OnInit} from '@angular/core';
import {PatternCardComponent} from '../../../shared/pattern-card/pattern-card.component';
import {PrizeData} from '../../../core/models/round';
import {GameService} from '../../../core/services/game.service';
import {RoundService} from '../../../core/services/round.service';
import {PatternService} from '../../../core/services/pattern.service';
import {BingoCardComponent} from '../../../shared/bingo-card/bingo-card.component';
import {Card, CardBox} from '../../../core/models/card';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-prizes-row',
  imports: [
    PatternCardComponent,
    BingoCardComponent,
    TitleCasePipe
  ],
  templateUrl: './prizes-row.component.html',
  styleUrl: './prizes-row.component.scss'
})
export class PrizesRowComponent implements OnInit {
  gameService = inject(GameService)
  roundService = inject(RoundService)
  patternService = inject(PatternService)
  prizeData = input.required<PrizeData>()
  shortInfo = input.required<boolean>()
  prizeRound = ''
  patternName = ''
  patternMatrix: boolean[] = []

  ngOnInit() {
    this.getPrizeRoundName()
    this.getPrizeRowPattern()
    if (this.shortInfo()) {
      this.patternService.getPatternById(this.prizeData().patternId).subscribe({
        next: result => {
          this.patternName = result.patternName;
        }
      })
    }
  }

  mapCard(): Card {
    return {
      cardNumber: this.prizeData().cardNumber,
      content: this.prizeData().cardContentMatrix.map<CardBox>(box => ({number: box, marked: false})),
    }
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
