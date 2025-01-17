import {Component, inject, input, OnInit, signal} from '@angular/core';
import {Card, CardBox, GameCardInfo} from '../../models/card';
import {MatDialog} from '@angular/material/dialog';

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
  readonly dialog = inject(MatDialog);
  ngOnInit() {
    this.card = {
      cardNumber: this.gameCard().cardNumber,
      content: this.gameCard().contentMatrix
        .map<CardBox>(value => ({number: value,
          marked: false}))
    }
  }

  protected readonly console = console;
}
