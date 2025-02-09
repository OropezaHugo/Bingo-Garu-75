import {Component, inject, OnInit} from '@angular/core';
import {RoundService} from '../../../core/services/round.service';
import {RoundPatternsListComponent} from '../round-patterns-list/round-patterns-list.component';
import {MatAccordion, MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';

@Component({
  selector: 'app-game-pattern-section-list',
  imports: [
    RoundPatternsListComponent,
    MatAccordion,
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
