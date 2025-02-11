import {Component, inject, OnInit} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {PrizeData, Round} from '../../../core/models/round';
import {RoundService} from '../../../core/services/round.service';
import {MatDivider} from '@angular/material/divider';
import {PrizesRowComponent} from '../../end-game/prizes-row/prizes-row.component';

@Component({
  selector: 'app-round-prizes-board',
  imports: [
    MatDivider,
    PrizesRowComponent
  ],
  templateUrl: './round-prizes-board.component.html',
  styleUrl: './round-prizes-board.component.scss'
})
export class RoundPrizesBoardComponent implements OnInit {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<RoundPrizesBoardComponent>>(MatBottomSheetRef);
  roundService = inject(RoundService)
  round = inject<Round>(MAT_BOTTOM_SHEET_DATA)
  roundPrizes: PrizeData[] = []
  ngOnInit() {
    this.roundService.getPrizesByRoundId(this.round.id!).subscribe({
      next: result => {
        this.roundPrizes = result;
      }
    })
  }
}
