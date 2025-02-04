import {Component, inject, input, model, OnInit, signal} from '@angular/core';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {PatternCardComponent} from "../../../shared/pattern-card/pattern-card.component";
import {RoundPatternInfo} from '../../../core/models/add-pattern-dialog-data';
import {GameService} from '../../../core/services/game.service';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatTooltip} from '@angular/material/tooltip';
import {SnackbarService} from "../../../core/services/snackbar.service";
import {RoundService} from '../../../core/services/round.service';
import {MatAccordion} from '@angular/material/expansion';
import {RoundPatternsListComponent} from '../../../pages/game/round-patterns-list/round-patterns-list.component';
import {RoundPatternInfoComponent} from '../round-pattern-info/round-pattern-info.component';
import {MatTab, MatTabGroup} from '@angular/material/tabs';

@Component({
  selector: 'app-game-pattern-info',
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
