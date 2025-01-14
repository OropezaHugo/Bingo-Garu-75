import {Component, inject, input, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import {PatternCardComponent} from "../../shared/pattern-card/pattern-card.component";
import {EmptyPattern, ExamplePatterns, NewPatternDialogData} from '../../models/add-pattern-dialog-data';
import {NewPatternDialogComponent} from '../new-pattern-dialog/new-pattern-dialog.component';
import {MatDialog} from '@angular/material/dialog';

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

  selectedPatterns = input.required<NewPatternDialogData[]>();
  patterns: NewPatternDialogData[] = []
  shownPatterns: NewPatternDialogData[] = []

  readonly dialog = inject(MatDialog);

  openEditPatternDialog(pattern: NewPatternDialogData): void {
    const dialogRef = this.dialog.open(NewPatternDialogComponent, {
      data: this.patterns.find(p => p == pattern),
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.pattern != EmptyPattern) {
        this.patterns.filter(p => p != pattern)
        this.patterns.push(pattern)
      }
    });
  }
  openCreatePatternDialog(): void {
    const dialogRef = this.dialog.open(NewPatternDialogComponent, {
      data: {
        pattern: EmptyPattern.pattern,
        name: ""
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result.pattern != EmptyPattern) {
        this.patterns.push(result);
      }
    });
  }

  ngOnInit() {
    this.patterns = ExamplePatterns
    this.shownPatterns = this.patterns
  }

  filterPatterns(event: Event) {
    this.shownPatterns = this.patterns.filter(
      value =>
        value.name.toLowerCase().includes((event.target as HTMLInputElement).value.toLowerCase())
    )
  }
  addToGame(pattern: NewPatternDialogData) {
    if (!this.selectedPatterns().includes(pattern)) {
      this.selectedPatterns().push(pattern);
    }
  }

}
