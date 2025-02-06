import {AfterViewInit, Component, inject, model, OnInit, signal, viewChild} from '@angular/core';
import { GameService } from '../../../core/services/game.service';
import {SaleButtonComponent} from '../sale-button/sale-button.component';
import {Card, CardBox, GameCardInfo} from '../../../core/models/card';
import {BingoCardComponent} from '../../../shared/bingo-card/bingo-card.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {SaleCardDialogComponent} from '../sale-card-dialog/sale-card-dialog.component';
import {RectanglebuttonComponent} from '../../../shared/buttons/rectanglebutton/rectanglebutton.component';
import { ExportCardDialogComponent } from '../export-card-dialog/export-card-dialog.component';
import {MatButton} from '@angular/material/button';
import {MatStepperNext} from '@angular/material/stepper';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {Serial} from '../../../core/models/serial';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatIcon} from '@angular/material/icon';
import {MatInput} from '@angular/material/input';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-sale-panel',
  imports: [
    SaleButtonComponent,
    MatSortHeader,
    BingoCardComponent,
    MatPaginator,
    RectanglebuttonComponent,
    MatButton,
    MatStepperNext,
    MatLabel,
    MatSuffix,
    MatIcon,
    MatInput,
    MatFormField,
    MatSort,
    MatHeaderCellDef,
    MatHeaderCell,
    MatColumnDef,
    MatTable,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatNoDataRow,
    MatHeaderRowDef,
    TitleCasePipe
  ],
  templateUrl: './sale-panel.component.html',
  styleUrl: './sale-panel.component.scss'
})
export class SalePanelComponent implements OnInit, AfterViewInit{
  dataSource: MatTableDataSource<GameCardInfo> = new MatTableDataSource();
  sort = viewChild.required<MatSort>(MatSort)
  paginator = viewChild.required<MatPaginator>(MatPaginator)

  pageSize = model<number>(25);
  pageIndex = model<number>(0);
  pageSizeOptions = [15, 25, 40];
  columns: string[] = ['cardNumber', "sold", "userName"];
  gameService = inject(GameService)
  displayedCard?: Card
  displayedCardBuyer: string | undefined
  selectedCards = signal<GameCardInfo[]>([])
  dialog = inject(MatDialog)
  displayCard(gameCard: GameCardInfo) {
    this.displayedCard = {
      cardNumber: gameCard.cardNumber,
      content: gameCard.contentMatrix
        .map<CardBox>(value => ({number: value, marked: false, lastNumber: 0}))
    }
    if (gameCard.userName.length > 2) {
      this.displayedCardBuyer = gameCard.userName;
    } else {
      this.displayedCardBuyer = undefined
    }
  }
 ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.gameService.gameCards())
      this.dataSource.sort = this.sort()
      this.dataSource.paginator = this.paginator()
    }, 1000)

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
        hasBackdrop: true,

      })
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          result.forEach((card: GameCardInfo) => {
            this.gameService.sellCard(card);
          })
          this.selectedCards.set([])
          this.pageSize.set(25);
          setTimeout(() => {
            this.dataSource = new MatTableDataSource(this.gameService.gameCards())
            this.dataSource.sort = this.sort()
            this.dataSource.paginator = this.paginator()
          }, 1000)

        }
      })
    }
  }


  openExportDialog() {
    this.dialog.open(ExportCardDialogComponent, {
      width: '500px',
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
