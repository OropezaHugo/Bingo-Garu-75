import {Component, inject, input} from '@angular/core';
import {MatTab} from "@angular/material/tabs";
import {Round} from '../../../core/models/round';
import {RoundRaffledNumbersComponent} from '../round-raffled-numbers/round-raffled-numbers.component';
import {MatButton} from '@angular/material/button';
import {RoundService} from '../../../core/services/round.service';

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
  lastNumber = 0
  animate: boolean = true

  raffleNumber() {
    this.lastNumber = this.roundService.raffleNumber(this.round().raffleNumbers)
    this.round().raffleNumbers.push(this.lastNumber)
    this.roundService.updateRoundData(this.round())
    this.animate = true
  }

  resetAnimation() {
    this.animate = false; // Limpia la animación después de que termine
  }
}
