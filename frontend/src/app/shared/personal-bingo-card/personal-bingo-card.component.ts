import { Component, inject, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Card } from '../../core/models/card';

@Component({
  selector: 'app-personal-bingo-card',
  imports: [ MatIcon],
  templateUrl: './personal-bingo-card.component.html',
  styleUrl: './personal-bingo-card.component.scss'
})
export class PersonalBingoCardComponent {
 card = input.required<Card>()
 serialId = input<number>()
 boughtBy = input<string | undefined>()

 StrokeColor: string = '#000000';
 BoxFillColor: string = '#000000';
 CardFillColor: string = '#FFFFFF';
 CardNameColor: string = '#000000';
 BoxNumberColor: string = '#000000';
 CardNumberColor: string = '#000000';

  clickBox(event: MouseEvent, boxIndex: number) {
    const currentCard = this.card();
    if (currentCard && currentCard.content) {
      currentCard.content[boxIndex].marked = !currentCard.content[boxIndex].marked;
    }
  }

}
