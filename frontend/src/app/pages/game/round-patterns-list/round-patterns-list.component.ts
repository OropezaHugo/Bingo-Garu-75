import {Component, inject, input, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {PatternCardComponent} from "../../../shared/pattern-card/pattern-card.component";
import {Pattern} from '../../../core/models/add-pattern-dialog-data';
import {RoundService} from '../../../core/services/round.service';
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {Round} from '../../../core/models/round';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-round-patterns-list',
  imports: [
    MatButton,
    PatternCardComponent,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionPanel,
    MatIcon,
    MatIconButton
  ],
  templateUrl: './round-patterns-list.component.html',
  styleUrl: './round-patterns-list.component.scss'
})
export class RoundPatternsListComponent implements OnInit {
  round = input.required<Round>()
  roundPatterns: Pattern[] = []
  roundService = inject(RoundService)
  ngOnInit() {
    this.roundService.getPatternsByRoundId(this.round().id!).subscribe({
      next: result => {
        this.roundPatterns = result
      }
    })
  }
  reloadRoundPatterns() {
    this.roundService.getPatternsByRoundId(this.round().id!).subscribe({
      next: result => {
        this.roundPatterns = result
      }
    })
  }

  removeFromRound(pattern: Pattern) {
    this.roundService.deletePatternFromRound(this.round().id!, pattern.id).subscribe({
      next: result => {
        if (result){
          this.roundService.getPatternsByRoundId(this.round().id!).subscribe({
            next: result => {
              this.roundPatterns = result
            }
          })
        }
      }
    })
  }
}
