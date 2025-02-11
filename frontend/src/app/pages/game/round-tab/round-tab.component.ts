import {Component, inject, input, OnInit} from '@angular/core';
import {Round} from '../../../core/models/round';
import {RoundRaffledNumbersComponent} from '../round-raffled-numbers/round-raffled-numbers.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {RoundService} from '../../../core/services/round.service';
import {MatIcon} from '@angular/material/icon';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-round-tab',
  imports: [
    MatLabel,
    RoundRaffledNumbersComponent,
    MatButton,
    MatIconButton,
    MatIcon,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
  ],
  templateUrl: './round-tab.component.html',
  styleUrl: './round-tab.component.scss'
})
export class RoundTabComponent implements OnInit {
  roundService = inject(RoundService);
  round = input.required<Round>();
  lastNumber = 0
  animate: boolean = true
  intervalId:any = null
  intervalTime = new FormControl<number>(2, Validators.required);
  countdownId:any = null
  timeLeft: number = this.intervalTime.value ?? 2


  ngOnInit() {
    this.lastNumber = this.round().raffleNumbers[this.round().raffleNumbers.length - 1] ?? 0
  }

  raffleNumber() {
    this.lastNumber = this.roundService.raffleNumber(this.round().raffleNumbers)
    this.round().raffleNumbers.push(this.lastNumber)
    this.roundService.updateRoundData(this.round())
    this.animate = true
  }

  startRaffle(): void {
    if (this.intervalId || this.round().raffleNumbers.length === 75) {
      return;
    }

    this.timeLeft = this.intervalTime.value ?? 2
    this.startCountdown()
    this.intervalId = setInterval(() => {
      if (this.round().raffleNumbers.length === 75) {
        this.pauseRaffle()
        return;
      }
      this.lastNumber = this.roundService.raffleNumber(this.round().raffleNumbers)
      this.round().raffleNumbers.push(this.lastNumber)
      this.roundService.updateRoundData(this.round())
      this.timeLeft = this.intervalTime.value ?? 2
      this.startCountdown()
      this.animate = true
    }, (this.intervalTime.value ?? 2) * 1000);
  }

  pauseRaffle(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      clearInterval(this.countdownId)
      this.intervalId = null;
      this.countdownId = null;
    }
  }

  resetAnimation() {
    this.animate = false;
  }

  startCountdown(): void {
    if (this.countdownId) {
      clearInterval(this.countdownId);
    }

    this.countdownId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.countdownId);
      }
    }, 1000);
  }
}
