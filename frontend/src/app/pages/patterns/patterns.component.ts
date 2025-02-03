import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PatternService } from '../../core/services/pattern.service';
import { GameService } from '../../core/services/game.service';
import { Pattern, EmptyPattern, EmptyPatternData } from '../../core/models/add-pattern-dialog-data';
import { NewPatternDialogComponent } from '../../sections/pattern-section/new-pattern-dialog/new-pattern-dialog.component';
import { PatternCardComponent } from "../../shared/pattern-card/pattern-card.component";
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-patterns',
  imports: [
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatLabel,
    MatSuffix,
    MatTooltip,
    PatternCardComponent
    ],
  templateUrl: './patterns.component.html',
  styleUrl: './patterns.component.scss',
})
export class PatternsComponent implements OnInit {
  patternService = inject(PatternService);
  gameService = inject(GameService);
  readonly dialog = inject(MatDialog);

  ngOnInit() {
    this.patternService.getPatterns();
  }

  openEditPatternDialog(pattern: Pattern): void {
    const dialogRef = this.dialog.open(NewPatternDialogComponent, {
      data: pattern,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.pattern !== EmptyPattern) {
        this.patternService.updatePattern(result);
      } else {
        this.patternService.getPatterns();
      }
    });
  }

  openCreatePatternDialog(): void {
    const dialogRef = this.dialog.open(NewPatternDialogComponent, {
      data: EmptyPattern,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.pattern !== EmptyPattern) {
        this.patternService.postPattern(result);
        this.patternService.getPatterns();
        EmptyPattern.patternName = "";
        EmptyPattern.patternMatrix = EmptyPatternData;
      }
    });
  }

  filterPatterns(event: Event) {
    this.patternService.getPatterns((event.target as HTMLInputElement).value);
  }


  deletePattern(pattern: Pattern) {
    this.patternService.deletePattern(pattern.id);
  }
}
