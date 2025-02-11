import {Component, inject, model} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-confir-dialog',
  imports: [
    MatDialogContent,
    MatButton,
    MatDialogActions,
    MatDialogTitle
  ],
  templateUrl: './confir-dialog.component.html',
  styleUrl: './confir-dialog.component.scss'
})
export class ConfirDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirDialogComponent>);
  readonly data = inject<boolean>(MAT_DIALOG_DATA);
  accept = model(this.data);

  onNoClick(): void {
    this.dialogRef.close();
  }
  onClick(){
    this.dialogRef.close(true);
  }
}
