import {Component, inject, input, OnInit} from '@angular/core';
import {Round} from '../../../core/models/round';
import {RoundRaffledNumbersComponent} from '../round-raffled-numbers/round-raffled-numbers.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {RoundService} from '../../../core/services/round.service';
import {MatIcon} from '@angular/material/icon';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {PatternService} from '../../../core/services/pattern.service';

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
    MatHint,
    ReactiveFormsModule,
  ],
  templateUrl: './round-tab.component.html',
  styleUrl: './round-tab.component.scss'
})
export class RoundTabComponent implements OnInit {
  numberToSet = new FormControl<number>(1, [Validators.min(1), Validators.max(75)]);
  roundService = inject(RoundService);
  patternService = inject(PatternService);
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

  setNumber() {
    if (this.numberToSet !== null && this.numberToSet !== undefined && this.numberToSet.valid) {
      if (!this.round().raffleNumbers.includes(this.numberToSet.value!)) {
        this.lastNumber = this.numberToSet.value!
        this.saveActivePatterns()
        this.round().raffleNumbers.push(this.lastNumber)
        this.roundService.updateRoundData(this.round())
        this.animate = true
        this.numberToSet.setValue(null)
      }
    }
  }
  raffleNumber() {
    this.lastNumber = this.roundService.raffleNumber(this.round().raffleNumbers)
    this.saveActivePatterns()
    this.round().raffleNumbers.push(this.lastNumber)
    this.roundService.updateRoundData(this.round())
    this.animate = true
  }

  saveActivePatterns() {
    this.roundService.getPrizesByRoundId(this.round().id!).subscribe({
      next: (r) => {
        r.forEach((prize) => {
          this.patternService.getPatternById(prize.patternId!).subscribe({
            next: (pattern) => {
              this.roundService.updatePatternInRound({
                id: pattern.id,
                active: false,
                targetPrice: 0,
                patternName: pattern.patternName,
                patternMatrix: pattern.patternMatrix
              }, this.round().id!).subscribe()
            }
          })
        })
      }
    })
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
      this.saveActivePatterns()

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
