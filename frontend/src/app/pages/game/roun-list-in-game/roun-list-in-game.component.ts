import {Component, inject, input, OnInit} from '@angular/core';
import {Round} from '../../../core/models/round';
import {Pattern, RoundPatternInfo} from '../../../core/models/add-pattern-dialog-data';
import {RoundService} from '../../../core/services/round.service';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle} from '@angular/material/expansion';
import {MatIcon} from '@angular/material/icon';
import {PatternCardComponent} from '../../../shared/pattern-card/pattern-card.component';

@Component({
  selector: 'app-roun-list-in-game',
  imports: [
    MatButton,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatIcon,
    MatIconButton,
    PatternCardComponent
  ],
  templateUrl: './roun-list-in-game.component.html',
  styleUrl: './roun-list-in-game.component.scss'
})
export class RounListInGameComponent implements OnInit {
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
  reloadRoundPatterns() {
    this.roundService.getPatternsInfoByRoundId(this.round().id!).subscribe({
      next: result => {
        this.roundPatterns = result.filter(p => p.active)
      }
    })
  }

}
