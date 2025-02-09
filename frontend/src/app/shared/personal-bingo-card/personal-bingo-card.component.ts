import {Component, inject, input, OnInit} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Card } from '../../core/models/card';
import {SerialService} from '../../core/services/serial.service';
import {ColorService} from '../../core/services/ColorService';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-personal-bingo-card',
  imports: [ MatIcon],
  templateUrl: './personal-bingo-card.component.html',
  styleUrl: './personal-bingo-card.component.scss'
})
export class PersonalBingoCardComponent implements OnInit {
 card = input.required<Card>()
 serialId = input<number>()
 boughtBy = input<string | undefined>()

 StrokeColor: string = '#000000';
 BoxFillColor: string = '#000000';
 CardFillColor: string = '#FFFFFF';
 CardNameColor: string = '#000000';
 BoxNumberColor: string = '#000000';
 CardNumberColor: string = '#000000';
  private colorService = inject(ColorService);
  private colorSubscription?: Subscription;
  ngOnInit(): void {
    this.colorService.colors$.subscribe((colors: { StrokeColor: string; BoxFillColor: string; CardFillColor: string; CardNameColor: string; BoxNumberColor: string; CardNumberColor: string; }) => {
      this.StrokeColor = colors.StrokeColor;
      this.BoxFillColor = colors.BoxFillColor;
      this.CardFillColor = colors.CardFillColor;
      this.CardNameColor = colors.CardNameColor;
      this.BoxNumberColor = colors.BoxNumberColor;
      this.CardNumberColor = colors.CardNumberColor;
    });
  }
  ngOnDestroy(): void {
    if (this.colorSubscription) {
      this.colorSubscription.unsubscribe();
    }
  }
  constructor(private serialService: SerialService) {}
  clickBox(event: MouseEvent, boxIndex: number) {
    const currentCard = this.card();
    if (currentCard && currentCard.content) {
      currentCard.content[boxIndex].marked = !currentCard.content[boxIndex].marked;
    }
  }

}
