import {Component, inject, OnInit} from '@angular/core';
import {NewPatternDialogData} from '../../models/add-pattern-dialog-data';
import {PatternCardComponent} from '../../shared/pattern-card/pattern-card.component';
import {MatDialog} from '@angular/material/dialog';

import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {
  LobbySettingsDialogComponent
} from '../../components/dialogs/lobby-settings-dialog/lobby-settings-dialog.component';
import {PatternListComponentComponent} from '../../patterns/pattern-list-component/pattern-list-component.component';
import { GameService } from '../../core/services/game.service';
import {GamePatternsListComponent} from "../../lobby/game-patterns-list/game-patterns-list.component";


@Component({
  selector: 'app-lobby-page',
  imports: [
    MatIcon,
    MatButton,
    MatIconButton,
    PatternListComponentComponent,
    GamePatternsListComponent,
  ],
  templateUrl: './lobby-page.html',
  styleUrl: './lobby-page.scss'
})
export class LobbyPage implements OnInit {

  selectedPatterns: NewPatternDialogData[] = [
    {
      patternMatrix: [
        true, true, true, true, true,
        true, true, true, true, true,
        true, true, true, true, true,
        true, true, true, true, true,
        true, true, true, true, true,
      ],
      patternName: "Carton Lleno"
    }
  ]
  readonly dialog = inject(MatDialog);
  gameService = inject(GameService);


  openSettingsDialog(): void {
    const dialogRef = this.dialog.open(LobbySettingsDialogComponent, {
      data: this.gameService.actualGame(),
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.gameService.updateGame(result);
      }
    });
  }
  removeFromGame(pattern: NewPatternDialogData) {
    this.selectedPatterns = this.selectedPatterns.filter(p => p != pattern);
  }
  ngOnInit() {
    this.gameService.createNewGame()
  }

}
