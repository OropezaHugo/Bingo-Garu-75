import {Component, inject, model, OnInit, signal} from '@angular/core';
import { GameService } from '../../../core/services/game.service';
import {SaleButtonComponent} from '../sale-button/sale-button.component';
import {Card, CardBox, GameCardInfo} from '../../../core/models/card';
import {BingoCardComponent} from '../../../shared/bingo-card/bingo-card.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {SaleCardDialogComponent} from '../sale-card-dialog/sale-card-dialog.component';
import {RectanglebuttonComponent} from '../../../shared/buttons/rectanglebutton/rectanglebutton.component';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ExportCardDialogComponent } from '../export-card-dialog/export-card-dialog.component';

@Component({
  selector: 'app-sale-panel',
  imports: [
    SaleButtonComponent,
    BingoCardComponent,
    MatPaginator,
    RectanglebuttonComponent
  ],
  templateUrl: './sale-panel.component.html',
  styleUrl: './sale-panel.component.scss'
})
export class SalePanelComponent implements OnInit{

  pageSize = model<number>(25);
  pageIndex = model<number>(0);
  pageSizeOptions = [15, 25, 40];
  gameService = inject(GameService)
  displayedCard?: Card
  displayedCardBuyer: string | undefined
  selectedCards = signal<GameCardInfo[]>([])
  dialog = inject(MatDialog)
  displayCard(gameCard: GameCardInfo) {
    this.displayedCard = {
      cardNumber: gameCard.cardNumber,
      content: gameCard.contentMatrix
        .map<CardBox>(value => ({number: value, marked: false}))
    }
    if (gameCard.userName.length > 2) {
      this.displayedCardBuyer = gameCard.userName;
    } else {
      this.displayedCardBuyer = undefined
    }
  }

  ngOnInit() {
    this.gameService.getCardsByGameId()
  }
  selectCard(gameCard: GameCardInfo) {
    if (this.selectedCards().includes(gameCard)){
      this.selectedCards.update(value => value.filter(value1 => value1 !== gameCard))
    } else {
      this.selectedCards.update(value => [...value, gameCard]);
    }

  }
  updateLocalPagination(event: PageEvent){
    this.pageSize.set(event.pageSize);
    this.pageIndex.set(event.pageIndex);
  }
  getPaginatedList() {

    return this.gameService.gameCards()
      .slice(this.pageIndex() * this.pageSize(),
        (this.pageIndex() * this.pageSize()) + this.pageSize())
  }

  sellCards() {
    if (this.selectedCards().length > 0) {
      let dialogRef = this.dialog.open(SaleCardDialogComponent, {
        data: this.selectedCards(),
        hasBackdrop: false,
      })
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          result.forEach((card: GameCardInfo) => {
            this.gameService.sellCard(card);
          })
          this.selectedCards.set([])
          this.pageSize.set(25);
        }
      })
    }
  }

  openExportDialog() {
    this.dialog.open(ExportCardDialogComponent, {
      width: '500px',
    });
  }
}
