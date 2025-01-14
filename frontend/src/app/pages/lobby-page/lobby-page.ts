import {Component, inject} from '@angular/core';
import {NewPatternDialogData} from '../../models/add-pattern-dialog-data';
import {PatternCardComponent} from '../../shared/pattern-card/pattern-card.component';
import {MatDialog} from '@angular/material/dialog';

import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {
  LobbySettingsDialogComponent
} from '../../components/dialogs/lobby-settings-dialog/lobby-settings-dialog.component';
import {InitialLobbySettings} from '../../models/lobby-settings';
import {PatternListComponentComponent} from '../../patterns/pattern-list-component/pattern-list-component.component';


@Component({
  selector: 'app-lobby-page',
  imports: [
    PatternCardComponent,
    MatIcon,
    MatButton,
    MatIconButton,
    PatternListComponentComponent,
  ],
  templateUrl: './lobby-page.html',
  styleUrl: './lobby-page.scss'
})
export class LobbyPage {
  lobbySettings = InitialLobbySettings

  selectedPatterns: NewPatternDialogData[] = [
    {
      pattern: [
        true, true, true, true, true,
        true, true, true, true, true,
        true, true, true, true, true,
        true, true, true, true, true,
        true, true, true, true, true,
      ],
      name: "Carton Lleno"
    }
  ]
  readonly dialog = inject(MatDialog);


  openSettingsDialog(): void {
    const dialogRef = this.dialog.open(LobbySettingsDialogComponent, {
      data: this.lobbySettings,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.lobbySettings = result;
      }
    });
  }
  removeFromGame(pattern: NewPatternDialogData) {
    this.selectedPatterns = this.selectedPatterns.filter(p => p != pattern);
  }

}
