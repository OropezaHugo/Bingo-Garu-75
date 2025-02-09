import {Component, inject, model, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {Pattern} from '../../../core/models/add-pattern-dialog-data';
import {RoundService} from '../../../core/services/round.service';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-add-pattern-to-round-dialog',
  imports: [
    MatButton,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: './add-pattern-to-round-dialog.component.html',
  styleUrl: './add-pattern-to-round-dialog.component.scss'
})
export class AddPatternToRoundDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AddPatternToRoundDialogComponent>);
  readonly data = inject<Pattern>(MAT_DIALOG_DATA);
  readonly modelData = model(this.data);
  roundService = inject(RoundService)
  addToRound(roundId: number) {
    this.roundService.addPatternToRound(roundId, this.data.id).subscribe({
      next: result => {
          this.dialogRef.close(true)
      }
    })
  }
  ngOnInit() {
    this.roundService.getRounds()
  }

  addToEveryRound() {
    this.roundService.actualRounds().forEach((round) => {
      this.addToRound(round.id!)
    })
  }
}
