import {Component, inject, input, OnInit} from '@angular/core';
import {GameService} from '../../../core/services/game.service';
import {RoundService} from '../../../core/services/round.service';
import {RoundPatternInfo} from '../../../core/models/add-pattern-dialog-data';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SnackbarService} from '../../../core/services/snackbar.service';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {PatternCardComponent} from '../../../shared/pattern-card/pattern-card.component';
import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {RoundPatternsListComponent} from '../../../pages/game/round-patterns-list/round-patterns-list.component';
import {Round} from '../../../core/models/round';
import {PatternPrizableComponent} from '../pattern-prizable/pattern-prizable.component';

@Component({
  selector: 'app-round-pattern-info',
  imports: [
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    PatternCardComponent,
    ReactiveFormsModule,
    MatTooltip,
    MatAccordion,
    RoundPatternsListComponent,
    MatInput,
    MatLabel,
    PatternCardComponent,
    MatButton,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
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
}
