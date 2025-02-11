import {Component, inject, model} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {GameCardInfo} from '../../../core/models/card';
import {MatButton} from '@angular/material/button';
import {SaleButtonComponent} from '../sale-button/sale-button.component';
import {MatFormField, MatHint} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-sale-card-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    SaleButtonComponent,
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatHint
  ],
  templateUrl: './sale-card-dialog.component.html',
  styleUrl: './sale-card-dialog.component.scss'
})
export class SaleCardDialogComponent {
  readonly dialogRef = inject(MatDialogRef<SaleCardDialogComponent>);
  readonly data = inject<GameCardInfo[]>(MAT_DIALOG_DATA);
  readonly cards = model(this.data);

  userForm = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]);
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.userForm.valid && this.userForm.value) {
      this.cards.set(this.cards().map<GameCardInfo>((card: GameCardInfo) => {
        return {
          sold: true,
          userName: this.userForm.value!,
          cardId: card.cardId,
          gameId: card.gameId,
          contentMatrix: card.contentMatrix,
          cardNumber: card.cardNumber,
          serialId: card.serialId,
        };
      }))
      this.dialogRef.close(this.cards());
    }
  }
}
