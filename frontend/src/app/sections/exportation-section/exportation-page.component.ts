import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PersonalBingoCardComponent } from "../../shared/personal-bingo-card/personal-bingo-card.component";
import { Card } from '../../core/models/card';
import { GameService } from '../../core/services/game.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-exportation-section',
  imports: [PersonalBingoCardComponent, MatProgressBarModule],
  templateUrl: './exportation-page.component.html',
  styleUrl: './exportation-page.component.scss'
})
export class ExportationPageComponent implements OnInit {
  @ViewChild('cardsGrid') cardsGrid!: ElementRef;
  cardsArray: Card[] = [];
  paginatedCards: Card[][] = [];
  cardsPerPage = 100;
  currentPage = 0;
  isExporting = false;
  statusMessage = '';

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.cardsArray = this.gameService.gameCards().map(gameCard => ({
      cardNumber: gameCard.cardNumber,
      content: gameCard.contentMatrix.map(value => ({
        number: value,
        marked: false
      }))
    }));
    this.paginateCards();
  }

  paginateCards(): void {
    this.paginatedCards = [];
    for (let i = 0; i < this.cardsArray.length; i += this.cardsPerPage) {
      this.paginatedCards.push(this.cardsArray.slice(i, i + this.cardsPerPage));
    }
  }

  changePage(pageIndex: number): void {
    this.currentPage = pageIndex;
  }

  exportToPDF(pageIndex: number) {
    this.isExporting = true;
    this.statusMessage = 'Generando PDF...';
    this.currentPage = pageIndex;
    setTimeout(() => {
      const gridElement = this.cardsGrid.nativeElement;
      html2canvas(gridElement, { scale: 1 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        while (heightLeft > 0) {
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          position -= pageHeight;
          if (heightLeft > 0) {
            pdf.addPage();
          }
        }

        pdf.save(`bingo-cards-page-${pageIndex + 1}.pdf`);
        this.isExporting = false;
      });
    }, 100);
  }
}
