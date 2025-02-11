import {Component, inject, model} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatCheckbox} from '@angular/material/checkbox';
import {Game} from '../../../core/models/game';

@Component({
  selector: 'app-lobby-settings-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
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
