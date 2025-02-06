import {Component, input} from '@angular/core';
import {Card, CardBox, GameCardInfo} from '../../core/models/card';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-bingo-card',
  imports: [
    MatIcon,
    TitleCasePipe
  ],
  templateUrl: './bingo-card.component.html',
  styleUrl: './bingo-card.component.scss'
})
export class BingoCardComponent {
  card = input.required<Card>()
  boughtBy = input<string | undefined>()
  showOwnerInfo = input<boolean>(true)

  clickBox(event: MouseEvent, boxIndex: number) {
    if (typeof this.card())
    this.card().content[boxIndex].marked = !this.card().content[boxIndex].marked;
  }
}
