import {Component, inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {Round} from '../../../core/models/round';
import {GameCardInfo} from '../../../core/models/card';
import {MatDivider} from '@angular/material/divider';
import {PrizesRowComponent} from '../../end-game/prizes-row/prizes-row.component';
import {RoundPatternInfo} from '../../../core/models/add-pattern-dialog-data';

@Component({
  selector: 'app-pattern-winners-sheet',
  imports: [
    MatDivider,
    PrizesRowComponent
  ],
  templateUrl: './pattern-winners-sheet.component.html',
  styleUrl: './pattern-winners-sheet.component.scss'
})
export class PatternWinnersSheetComponent {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<PatternWinnersSheetComponent>>(MatBottomSheetRef);
  data = inject<{ cards: GameCardInfo[], pattern: RoundPatternInfo }>(MAT_BOTTOM_SHEET_DATA)
}
