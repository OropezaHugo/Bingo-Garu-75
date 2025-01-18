import {Component, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {PatternCardComponent} from '../../shared/pattern-card/pattern-card.component';
import {GameService} from '../../core/services/game.service';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {GamePatternInfo} from '../../models/add-pattern-dialog-data';
import {FormsModule} from '@angular/forms';
import {GamePatternInfoComponent} from '../game-pattern-info/game-pattern-info.component';
import {RectanglebuttonComponent} from '../../components/buttons/rectanglebutton/rectanglebutton.component';
import {MatDialog} from '@angular/material/dialog';
import {ConfirDialogComponent} from '../../shared/confir-dialog/confir-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pattern-target-prizes',
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
    RectanglebuttonComponent
  ],
  templateUrl: './pattern-target-prizes.component.html',
  styleUrl: './pattern-target-prizes.component.scss'
})
export class PatternTargetPrizesComponent {
  gameService = inject(GameService);
  dialog = inject(MatDialog);
  router = inject(Router);
  startGame() {
    let dialogRef = this.dialog.open(ConfirDialogComponent, {
      data: false
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.router.navigate(['/game']);
      }
    })
  }
}
