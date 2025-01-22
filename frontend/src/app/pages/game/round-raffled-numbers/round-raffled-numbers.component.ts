import {Component, input} from '@angular/core';
import {BingoNumbers} from '../../../core/models/round';

@Component({
  selector: 'app-round-raffled-numbers',
  imports: [],
  templateUrl: './round-raffled-numbers.component.html',
  styleUrl: './round-raffled-numbers.component.scss'
})
export class RoundRaffledNumbersComponent {
  raffledNumbers = input.required<number[]>();
  bingoNumbers = BingoNumbers
  lastNumber = input.required<number>();
}
