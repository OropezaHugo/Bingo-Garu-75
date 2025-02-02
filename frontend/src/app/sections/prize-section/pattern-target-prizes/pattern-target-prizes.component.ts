import {Component, inject, OnInit} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {PatternCardComponent} from '../../../shared/pattern-card/pattern-card.component';
import {GameService} from '../../../core/services/game.service';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {GamePatternInfo} from '../../../core/models/add-pattern-dialog-data';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {GamePatternInfoComponent} from '../game-pattern-info/game-pattern-info.component';
import {RectanglebuttonComponent} from '../../../shared/buttons/rectanglebutton/rectanglebutton.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirDialogComponent} from '../../../shared/dialogs/confir-dialog/confir-dialog.component';
import {Router} from '@angular/router';
import {RoundService} from '../../../core/services/round.service';
import {MatCheckbox} from '@angular/material/checkbox';
import {SnackbarService} from '../../../core/services/snackbar.service';

@Component({
  selector: 'app-pattern-target-prize-section',
  imports: [
    MatIcon,
    MatIconButton,
    MatTooltip,
    MatLabel,
    PatternCardComponent,
    MatFormField,
    MatInput,
    FormsModule,
    GamePatternInfoComponent,
    RectanglebuttonComponent,
    ReactiveFormsModule,
    MatCheckbox
  ],
  templateUrl: './pattern-target-prizes.component.html',
  styleUrl: './pattern-target-prizes.component.scss'
})
export class PatternTargetPrizesComponent implements OnInit {
  gameService = inject(GameService);



  ngOnInit() {
    this.gameService.getActualGamePatternsInfo()
    this.gameService.getCardsByGameId()
  }

}
