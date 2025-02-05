import {Component, inject, OnInit} from '@angular/core';
import {NewPatternDialogData} from '../../core/models/add-pattern-dialog-data';
import {PatternCardComponent} from '../../shared/pattern-card/pattern-card.component';
import {MatDialog} from '@angular/material/dialog';

import {MatIcon} from '@angular/material/icon';
import {MatButton, MatIconButton} from '@angular/material/button';
import {
  LobbySettingsDialogComponent
} from '../../shared/dialogs/lobby-settings-dialog/lobby-settings-dialog.component';
import {PatternListComponentComponent} from '../../sections/pattern-section/pattern-list-component/pattern-list-component.component';
import { GameService } from '../../core/services/game.service';
import {GamePatternsListComponent} from "../game/game-patterns-list/game-patterns-list.component";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext} from '@angular/material/stepper';
import {AttachSerialContentComponent} from '../../sections/serial-section/attach-serial-content/attach-serial-content.component';
import {SalePanelComponent} from '../../sections/sales-section/sale-panel/sale-panel.component';
import {PatternTargetPrizesComponent} from '../../sections/prize-section/pattern-target-prizes/pattern-target-prizes.component';
import { PersonalizationPageComponent } from "../../sections/personalization-section/personalization-page.component";
import { ExportationPageComponent } from '../../sections/exportation-section/exportation-page.component';
import {InvitationSectionComponent} from '../../sections/invitation-section/invitation-section.component';
import {PatternSectionComponent} from '../../sections/pattern-section/pattern-section.component';
import {GameConfigurationComponent} from '../../sections/game-configuration/game-configuration.component';
import {Router} from '@angular/router';


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
    ExportationPageComponent,
    InvitationSectionComponent,
    PatternSectionComponent,
    GameConfigurationComponent,
    MatStepperNext
  ],
  templateUrl: './lobby-page.html',
  styleUrl: './lobby-page.scss'
})
export class LobbyPage implements OnInit {
  gameService = inject(GameService);
  router = inject(Router);
  personalization = true;

  toggleView(): void {
    this.personalization = !this.personalization;
  }
  stepperOrientation() {
    if(window.innerWidth <= 1000) {
      return 'vertical';
    }
    return 'horizontal';
  }
  ngOnInit() {
    this.gameService.createNewGame().subscribe({
      next: value => {
        this.gameService.getCardsByGameId()
      }
    })

  }

  cancelGame() {
    this.gameService.disposeActualGame()
    this.gameService.createNewGame().subscribe({
      next: () => {
        location.reload();
      }
    })
  }

  continueGameInProgress() {
    this.router.navigateByUrl('/game')
  }

  closeGameInProgress() {
    this.gameService.updateGame({
      finished: true,
      inProgress: this.gameService.actualGame()!.inProgress,
      id: this.gameService.actualGame()!.id,
      automaticRaffle: this.gameService.actualGame()!.automaticRaffle,
      sharePrizes: this.gameService.actualGame()!.sharePrizes,
      randomPatterns: this.gameService.actualGame()!.randomPatterns,
    })
    this.gameService.disposeActualGame()
    this.gameService.createNewGame().subscribe({
      next: () => {
        location.reload();
      }
    })
  }
}
