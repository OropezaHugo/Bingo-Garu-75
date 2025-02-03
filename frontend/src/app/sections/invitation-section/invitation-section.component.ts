import {Component, inject, model, OnInit} from '@angular/core';
import {ConfirDialogComponent} from '../../shared/dialogs/confir-dialog/confir-dialog.component';
import {GameService} from '../../core/services/game.service';
import {RoundService} from '../../core/services/round.service';
import {SnackbarService} from '../../core/services/snackbar.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatCheckbox} from '@angular/material/checkbox';
import {MatFormField, MatHint, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {RectanglebuttonComponent} from '../../shared/buttons/rectanglebutton/rectanglebutton.component';
import {PatternsComponent} from '../../pages/patterns/patterns.component';
import {GamePatternInfoComponent} from '../prize-section/game-pattern-info/game-pattern-info.component';
import html2canvas from 'html2canvas';
import {MatButton, MatButtonModule, MatIconButton} from '@angular/material/button';
import {
  MatDatepicker,
  MatDatepickerActions, MatDatepickerApply, MatDatepickerCancel,
  MatDatepickerInput, MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatIcon} from '@angular/material/icon';
import {DatePipe} from '@angular/common';
import {MatDivider} from '@angular/material/divider';
import {InputMask} from 'primeng/inputmask';

@Component({
  selector: 'app-invitation-section',
  imports: [
    FormsModule,
    MatCheckbox,
    MatFormField,
    MatInput,
    MatLabel,
    RectanglebuttonComponent,
    ReactiveFormsModule,
    MatHint,
    MatButton,
    MatDatepickerToggle,
    MatDatepickerCancel,
    MatDatepickerApply,
    MatDatepickerActions,
    MatDatepicker,
    MatDatepickerInput,
    MatSuffix,
    MatIconButton,
    MatIcon,
    DatePipe,
    MatDivider,
    InputMask,

  ],
  providers: [
    provideNativeDateAdapter()
  ],
  templateUrl: './invitation-section.component.html',
  styleUrl: './invitation-section.component.scss'
})
export class InvitationSectionComponent implements OnInit {

  gameService = inject(GameService);
  roundService = inject(RoundService);
  snackBar = inject(SnackbarService);
  dialog = inject(MatDialog);
  router = inject(Router);

  dateForm = new FormControl<Date>(new Date())
  gamePricesForm = new FormControl<number>(0)
  eventTimeForm = new FormControl<string>('13:30', Validators.pattern('^([01]?[0-9]|2[0-3]):[0-5][0-9]$'))
  withOfferForm = new FormControl<boolean>(false)
  ngOnInit() {
    this.gameService.getActualGamePrizes()
    this.gameService.getCardsByGameId()
  }

  exportToImage() {
    const element = document.getElementById('content-to-export') as HTMLElement;

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `invitation-game-${this.gameService.actualGame()?.id}.png`;
      link.href = imgData;
      link.click();
    });
  }
  startGame() {
    if(this.gameService.gameCards().length > 0 )
    {

      let dialogRef = this.dialog.open(ConfirDialogComponent, {
        data: false
      })
      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.gameService.updateGame({
            finished: this.gameService.actualGame()!.finished,
            inProgress: true,
            id: this.gameService.actualGame()!.id,
            automaticRaffle: this.gameService.actualGame()!.automaticRaffle,
            sharePrizes: this.gameService.actualGame()!.sharePrizes,
            randomPatterns: this.gameService.actualGame()!.randomPatterns,
          })
          this.router.navigateByUrl('/game')
        }
      })
    } else {
      this.snackBar.error('adjunte un serial y un patron para iniciar la partida')
    }

  }


}
