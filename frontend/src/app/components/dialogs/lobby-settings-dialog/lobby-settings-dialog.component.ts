import {Component, inject, model} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {NewPatternDialogData} from '../../../models/add-pattern-dialog-data';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {Game} from '../../../models/game';

@Component({
  selector: 'app-lobby-settings-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatLabel,
    MatInput,
    MatFormField,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    FormsModule,
    MatCheckbox
  ],
  templateUrl: './lobby-settings-dialog.component.html',
  styleUrl: './lobby-settings-dialog.component.scss'
})
export class LobbySettingsDialogComponent {
  readonly dialogRef = inject(MatDialogRef<LobbySettingsDialogComponent>);
  readonly data = inject<Game>(MAT_DIALOG_DATA);
  readonly dialogModel = model(this.data)
}
