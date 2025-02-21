import {Component, inject, input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Round} from '../../../core/models/round';
import {RoundPatternInfo} from '../../../core/models/add-pattern-dialog-data';
import {RoundService} from '../../../core/services/round.service';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RoundPatternInGameComponent} from '../round-pattern-in-game/round-pattern-in-game.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {PatternWinnersSheetComponent} from '../pattern-winners-sheet/pattern-winners-sheet.component';

@Component({
  selector: 'app-roun-list-in-game',
  imports: [
    MatIcon,
    MatIconButton,
    RoundPatternInGameComponent
  ],
  templateUrl: './roun-list-in-game.component.html',
  styleUrl: './roun-list-in-game.component.scss'
})
export class RounListInGameComponent implements OnInit, OnChanges{
  round = input.required<Round>()
  roundPatterns: RoundPatternInfo[] = []
  roundService = inject(RoundService)
  private _bottomSheet = inject(MatBottomSheet);

  ngOnInit() {
    this.roundService.getPatternsInfoByRoundId(this.round().id!).subscribe({
      next: result => {
        this.roundPatterns = result.filter(p => p.active)
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.reloadRoundPatterns()
  }

  reloadRoundPatterns() {
    this.roundService.getPatternsInfoByRoundId(this.round().id!).subscribe({
      next: result => {
        this.roundPatterns = result.filter(p => p.active)
      }
    })
  }

  checkWinners(pattern: RoundPatternInfo) {
    this.roundService.getRoundsById(this.round().id!).subscribe({
      next: result => {
        this._bottomSheet.open(PatternWinnersSheetComponent, {
          data: {
            cards: this.roundService.gameService.gameCards().filter(card =>
              this.roundService.isBingoValidAndNotPassed(pattern.patternMatrix, card.contentMatrix, result.raffleNumbers)
            ),
            pattern: pattern
          }
        });
      }
    })

  }
}
