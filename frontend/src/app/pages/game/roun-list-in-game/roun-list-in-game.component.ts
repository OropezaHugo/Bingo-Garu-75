import {Component, inject, input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Round} from '../../../core/models/round';
import {RoundPatternInfo} from '../../../core/models/add-pattern-dialog-data';
import {RoundService} from '../../../core/services/round.service';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {RoundPatternInGameComponent} from '../round-pattern-in-game/round-pattern-in-game.component';

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

}
