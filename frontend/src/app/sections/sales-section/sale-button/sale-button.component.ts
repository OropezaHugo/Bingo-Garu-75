import {Component, input, OnInit} from '@angular/core';
import {Card, CardBox, GameCardInfo} from '../../../core/models/card';

@Component({
  selector: 'app-sale-button',
  imports: [],
  templateUrl: './sale-button.component.html',
  styleUrl: './sale-button.component.scss'
})
export class SaleButtonComponent implements OnInit {
  gameCard = input.required<GameCardInfo>()
  selected = input<boolean>(false);
  viewOnly = input.required<boolean>();
  card?: Card = undefined
  ngOnInit() {
    this.card = {
      cardNumber: this.gameCard().cardNumber,
      content: this.gameCard().contentMatrix
        .map<CardBox>(value => ({number: value,
          marked: false}))
    }
  }
}
