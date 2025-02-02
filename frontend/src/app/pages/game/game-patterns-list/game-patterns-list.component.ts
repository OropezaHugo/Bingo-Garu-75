import {Component, inject, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {PatternCardComponent} from "../../../shared/pattern-card/pattern-card.component";
import {GameService} from '../../../core/services/game.service';
import {Pattern} from '../../../core/models/add-pattern-dialog-data';

@Component({
  selector: 'app-game-pattern-section-list',
    imports: [
        MatButton,
        PatternCardComponent
    ],
  templateUrl: './game-patterns-list.component.html',
  styleUrl: './game-patterns-list.component.scss'
})
export class GamePatternsListComponent implements OnInit {
  gameService = inject(GameService)
  removeFromGame(pattern: Pattern) {
    this.gameService.deletePatternFromActualGame(pattern.id);
  }
  ngOnInit() {
    this.gameService.getActualGamePatterns()
  }
}
