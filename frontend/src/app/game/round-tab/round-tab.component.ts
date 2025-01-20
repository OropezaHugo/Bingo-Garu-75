import {Component, inject, input} from '@angular/core';
import {MatTab} from "@angular/material/tabs";
import {Round} from '../../models/round';
import {RoundRaffledNumbersComponent} from '../round-raffled-numbers/round-raffled-numbers.component';
import {MatButton} from '@angular/material/button';
import {RoundService} from '../../core/services/round.service';

@Component({
  selector: 'app-round-tab',
  imports: [
    MatTab,
    RoundRaffledNumbersComponent,
    MatButton
  ],
  templateUrl: './round-tab.component.html',
  styleUrl: './round-tab.component.scss'
})
export class RoundTabComponent {
  roundService = inject(RoundService);
  round = input.required<Round>();

  raffleNumber() {
    this.round().raffleNumbers.push(this.roundService.raffleNumber(this.round().raffleNumbers))
    this.roundService.updateRoundData(this.round())
  }
}
