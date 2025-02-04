import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {PatternCardComponent} from "../../../shared/pattern-card/pattern-card.component";
import {GameService} from '../../../core/services/game.service';
import {Pattern} from '../../../core/models/add-pattern-dialog-data';
import {RoundService} from '../../../core/services/round.service';
import {RoundPatternsListComponent} from '../round-patterns-list/round-patterns-list.component';
import {MatAccordion, MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';

@Component({
  selector: 'app-game-pattern-section-list',
  imports: [
    MatButton,
    PatternCardComponent,
    RoundPatternsListComponent,
    MatAccordion,
    MatExpansionPanel,

  ],
  templateUrl: './game-patterns-list.component.html',
  styleUrl: './game-patterns-list.component.scss'
})
export class GamePatternsListComponent implements OnInit {
  roundService = inject(RoundService)

  ngOnInit() {
    this.roundService.getRounds()
  }
}
