import {Component, inject, model} from '@angular/core';
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RectanglebuttonComponent} from "../../../shared/buttons/rectanglebutton/rectanglebutton.component";
import {MatTableDataSource} from '@angular/material/table';
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {NewSerialData} from '../../../core/models/serial';

@Component({
  selector: 'app-create-serial-dialog',
  imports: [
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    RectanglebuttonComponent,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './create-serial-dialog.component.html',
  styleUrl: './create-serial-dialog.component.scss'
})
export class CreateSerialDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CreateSerialDialogComponent>)
  readonly data = inject<NewSerialData>(MAT_DIALOG_DATA);
  newSerialData = model(this.data)


  serialFormGroup = new FormGroup({
    quantity: new FormControl<number>(this.newSerialData().cardNumber, Validators.required),
    name: new FormControl<string>('', [Validators.required, Validators.minLength(2)]),
  })
  createSerial() {
    if (this.serialFormGroup.value.quantity
      && this.serialFormGroup.value.name
      && this.serialFormGroup.valid) {
      this.dialogRef.close({cardNumber: this.serialFormGroup.value.quantity, serialName: this.serialFormGroup.value.name});
    }
  }
}
