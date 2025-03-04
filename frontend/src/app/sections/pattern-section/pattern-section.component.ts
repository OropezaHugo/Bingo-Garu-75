import {Component, inject, OnInit} from '@angular/core';
import {GamePatternsListComponent} from '../../pages/game/game-patterns-list/game-patterns-list.component';
import {PatternListComponentComponent} from './pattern-list-component/pattern-list-component.component';
import {RoundService} from '../../core/services/round.service';
import {MatButton} from '@angular/material/button';
import {MatStepperNext} from '@angular/material/stepper';

@Component({
  selector: 'app-pattern-section',
  imports: [
    GamePatternsListComponent,
    PatternListComponentComponent,
    MatButton,
    MatStepperNext
  ],
  templateUrl: './pattern-section.component.html',
  styleUrl: './pattern-section.component.scss'
})
export class PatternSectionComponent implements OnInit{

  roundService = inject(RoundService)
  ngOnInit() {
    this.roundService.getRounds()
  }
}
