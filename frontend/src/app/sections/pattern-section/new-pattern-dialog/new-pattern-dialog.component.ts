import {Component, inject, model} from '@angular/core';
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
import {EmptyPattern, NewPatternDialogData} from '../../../core/models/add-pattern-dialog-data';
import {PatternCardComponent} from '../../../shared/pattern-card/pattern-card.component';
import { SnackbarService } from '../../../core/services/snackbar.service';

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
  readonly snackbarService = inject(SnackbarService);
  readonly dialogModel = model(this.data)

  cancel(){
    this.dialogModel.set(EmptyPattern)
    this.dialogRef.close();
  }

  isValidPattern(): boolean {
    const markedBoxes = this.dialogModel().patternMatrix.filter(box => box).length;
    return markedBoxes > 1;
  }

  isValidName(): boolean {
    return this.dialogModel().patternName.trim().length > 0;
  }

  confirm() {
    if (!this.isValidName()) {
      this.snackbarService.error("El patrón debe tener un nombre.");
      return;
    }

    if (!this.isValidPattern()) {
      this.snackbarService.error("El patrón no puede contener solo el centro.");
      return;
    }

    this.dialogRef.close(this.dialogModel()); 
  }
}
