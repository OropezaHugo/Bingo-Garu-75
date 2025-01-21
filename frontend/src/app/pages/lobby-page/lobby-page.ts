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
import {MatStep, MatStepLabel, MatStepper} from '@angular/material/stepper';
import {AttachSerialContentComponent} from '../../serials/attach-serial-content/attach-serial-content.component';
import {SalePanelComponent} from '../../sales/sale-panel/sale-panel.component';
import {PatternTargetPrizesComponent} from '../../prizes/pattern-target-prizes/pattern-target-prizes.component';
import { PersonalizationPageComponent } from "../personalization-page/personalization-page.component";
import { ExportationPageComponent } from '../exportation-page/exportation-page.component';


@Component({
  selector: 'app-lobby-page',
  imports: [
    MatIcon,
    MatButton,
    MatIconButton,
    PatternListComponentComponent,
    GamePatternsListComponent,
    MatStepper,
    MatStep,
    AttachSerialContentComponent,
    MatStepLabel,
    SalePanelComponent,
    PatternTargetPrizesComponent,
    PersonalizationPageComponent,
    ExportationPageComponent
],
  templateUrl: './lobby-page.html',
  styleUrl: './lobby-page.scss'
})
export class LobbyPage implements OnInit {

  readonly dialog = inject(MatDialog);
  gameService = inject(GameService);
  personalization = true;

  toggleView(): void {
    this.personalization = !this.personalization;
  }

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
  ngOnInit() {
    this.gameService.createNewGame()
  }

}
