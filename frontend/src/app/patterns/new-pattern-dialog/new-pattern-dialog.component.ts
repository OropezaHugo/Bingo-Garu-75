import {Component, inject, model, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {EmptyPattern, NewPatternDialogData} from '../../models/add-pattern-dialog-data';
import {PatternCardComponent} from '../../shared/pattern-card/pattern-card.component';

@Component({
  selector: 'app-new-pattern-dialog',
  imports: [
    MatButton,
    MatDialogActions,
    MatInput,
    MatLabel,
    MatFormField,
    MatDialogContent,
    MatDialogTitle,
    FormsModule,
    MatDialogClose,
    PatternCardComponent
  ],
  templateUrl: './new-pattern-dialog.component.html',
  styleUrl: './new-pattern-dialog.component.scss'
})
export class NewPatternDialogComponent {
  readonly dialogRef = inject(MatDialogRef<NewPatternDialogComponent>);
  readonly data = inject<NewPatternDialogData>(MAT_DIALOG_DATA);
  readonly dialogModel = model(this.data)

  cancel(){
    this.dialogModel.set(EmptyPattern)
    this.dialogRef.close();
  }
}
