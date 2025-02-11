import {Component, inject, input, OnInit} from '@angular/core';
import {GameService} from '../../../core/services/game.service';
import {RoundService} from '../../../core/services/round.service';
import {RoundPatternInfo} from '../../../core/models/add-pattern-dialog-data';
import {ReactiveFormsModule} from '@angular/forms';
import {MatIcon} from '@angular/material/icon';
import { MatIconButton} from '@angular/material/button';
import {Round} from '../../../core/models/round';
import {PatternPrizableComponent} from '../pattern-prizable/pattern-prizable.component';

@Component({
  selector: 'app-round-pattern-info',
  imports: [

    MatIcon,
    MatIconButton,
    ReactiveFormsModule,
    PatternPrizableComponent
  ],
  templateUrl: './round-pattern-info.component.html',
  styleUrl: './round-pattern-info.component.scss'
})
export class RoundPatternInfoComponent implements OnInit {
  gameService = inject(GameService);
  roundService = inject(RoundService);
  round = input.required<Round>()
  roundPatterns: RoundPatternInfo[] = []
  ngOnInit() {
    this.roundService.getPatternsInfoByRoundId(this.round().id!).subscribe({
      next: result => {
        this.roundPatterns = result
      }
    })
    this.roundService.getRounds()
  }
  reloadRoundPatterns() {
    this.roundService.getPatternsInfoByRoundId(this.round().id!).subscribe({
      next: result => {
        this.roundPatterns = result
      }
    })
  }
}
