import {Component, computed, effect, inject, input, OnInit, signal} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {PatternCardComponent} from "../../../shared/pattern-card/pattern-card.component";
import {
  EmptyPattern,
  EmptyPatternData,
  ExamplePatterns,
  NewPatternDialogData,
  Pattern
} from '../../../core/models/add-pattern-dialog-data';
import {NewPatternDialogComponent} from '../new-pattern-dialog/new-pattern-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {PatternService} from '../../../core/services/pattern.service';
import {GameService} from '../../../core/services/game.service';
import {AddPatternToRoundDialogComponent} from '../add-pattern-to-round-dialog/add-pattern-to-round-dialog.component';

@Component({
  selector: 'app-pattern-list-component',
    imports: [
        MatButton,
        MatFormField,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        MatSuffix,
        MatTooltip,
        PatternCardComponent
    ],
  templateUrl: './pattern-list-component.component.html',
  styleUrl: './pattern-list-component.component.scss'
})
export class PatternListComponentComponent implements OnInit {
  inGame = input<boolean>(false)
  patternService = inject(PatternService);
  gameService = inject(GameService);
  readonly dialog = inject(MatDialog);

  openEditPatternDialog(pattern: Pattern): void {
    const dialogRef = this.dialog.open(NewPatternDialogComponent, {
      data: pattern,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.pattern != EmptyPattern) {
        this.patternService.updatePattern(result);
      }  else {
        this.patternService.getPatterns()
      }
    });
  }
  openCreatePatternDialog(): void {
    const dialogRef = this.dialog.open(NewPatternDialogComponent, {
      data: EmptyPattern,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.pattern != EmptyPattern) {
        this.patternService.postPattern(result)
        this.patternService.getPatterns()
        EmptyPattern.patternMatrix = EmptyPatternData
        EmptyPattern.patternName = ""
      }
    });
  }

  ngOnInit() {
    this.patternService.getPatterns()
  }

  filterPatterns(event: Event) {
    this.patternService.getPatterns((event.target as HTMLInputElement).value)
  }

  openAddPatternToRoundDialog(pattern: Pattern){
    this.dialog.open(AddPatternToRoundDialogComponent, {
      data: pattern,
    }).afterClosed().subscribe(result => {
      if (result === true){

      }
    })
  }
  deletePattern(pattern: Pattern) {
    this.patternService.deletePattern(pattern.id)
  }
}
