import { Component, effect, OnInit, signal } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { Round } from '../../core/models/round';
import { RoundPatternInfo } from '../../core/models/add-pattern-dialog-data';
import { RoundService } from '../../core/services/round.service';
import { InvitationColorService } from '../../core/services/InvitationColorService';

@Component({
  selector: 'app-patter-columns-list',
  imports: [
    MatIcon,
    MatDivider
  ],
  templateUrl: './patter-columns-list.component.html',
  styleUrl: './patter-columns-list.component.scss'
})
export class PatterColumnsListComponent implements OnInit {
  rounds = signal<Round[]>([]);
  patternsByRound = signal<Map<number, RoundPatternInfo[]>>(new Map());
  offerColor = signal<string>('#e91e63')

  constructor(private roundService: RoundService, private invitationColorService: InvitationColorService) {
    effect(() => {
      const currentRounds = this.roundService.actualRounds();
      if (currentRounds.length > 0) {
        this.rounds.set(currentRounds);
        this.loadPatterns(currentRounds);
      }
    });
    this.invitationColorService.colors$.subscribe(colors => {
      this.offerColor.set(colors.OfferColor);
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
