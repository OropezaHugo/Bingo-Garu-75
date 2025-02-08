import { Component, OnInit } from '@angular/core';
import { Round } from '../../core/models/round';
import { RoundPatternInfo } from '../../core/models/add-pattern-dialog-data';
import { RoundService } from '../../core/services/round.service';
import { signal, effect } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-pattern-name-list',
  templateUrl: './pattern-name-list.component.html',
  imports: [
    MatIcon,
    MatDivider
  ],
  styleUrl: './pattern-name-list.component.scss'
})
export class PatternNameListComponent implements OnInit {
  rounds = signal<Round[]>([]);
  patternsByRound = signal<Map<number, RoundPatternInfo[]>>(new Map());

  constructor(private roundService: RoundService) {
    effect(() => {
      const currentRounds = this.roundService.actualRounds();
      if (currentRounds.length > 0) {
        this.rounds.set(currentRounds);
        this.loadPatterns(currentRounds);
      }
    });
  }

  ngOnInit(): void {
    this.roundService.getRounds();
  }

  private loadPatterns(rounds: Round[]): void {
    rounds.forEach(round => {
      if (round.id) {
        this.roundService.getPatternsInfoByRoundId(round.id).subscribe({
          next: (patterns) => {
            const currentPatterns = new Map(this.patternsByRound());
            currentPatterns.set(round.id!, patterns);
            this.patternsByRound.set(currentPatterns);
          },
          error: (error) => console.error('Error loading patterns:', error)
        });
      }
    });
  }
}
