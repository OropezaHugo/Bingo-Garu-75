import {Component, input, OnInit} from '@angular/core';
import {Card, CardBox, GameCardInfo} from '../../models/card';
import {MatIcon} from '@angular/material/icon';
import { SerialColorsDTO } from '../../models/colorSerial';
import { SerialService } from '../../core/services/serial.service';

@Component({
  selector: 'app-bingo-card',
  imports: [
    MatIcon
  ],
  templateUrl: './bingo-card.component.html',
  styleUrl: './bingo-card.component.scss'
})

export class BingoCardComponent implements OnInit {
 card = input.required<Card>()
 serialId = input<number>()
 boughtBy = input<string | undefined>()

 colors: SerialColorsDTO | undefined;

 constructor(private serialService: SerialService) {}

 ngOnInit(): void {
  const serialIdValue = this.serialId()
  if (serialIdValue) {
    this.serialService.getColorsSerial(serialIdValue).subscribe(
      (colors: SerialColorsDTO) => {
        this.colors = colors;
      },
      (error) => {
        console.error('Error fetching serial colors', error);
      }
    );
  }
}
  clickBox(event: MouseEvent, boxIndex: number) {
    if (typeof this.card())
    this.card().content[boxIndex].marked = !this.card().content[boxIndex].marked;
  }
}
