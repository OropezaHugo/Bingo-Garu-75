import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PersonalBingoCardComponent } from "../../shared/personal-bingo-card/personal-bingo-card.component";
import { Card } from '../../core/models/card';
import { GameService } from '../../core/services/game.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatHint, MatLabel, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-exportation-section',
  imports: [PersonalBingoCardComponent, MatProgressBarModule, FormsModule, MatIconButton, MatIcon, MatSuffix, MatButton, ReactiveFormsModule, MatInput, MatLabel, MatFormField, MatHint],
  templateUrl: './exportation-page.component.html',
  styleUrl: './exportation-page.component.scss'
})
export class ExportationPageComponent implements OnInit {
  @ViewChild('cardsGrid') cardsGrid!: ElementRef;
  cardsArray: Card[] = [];
  paginatedCards: Card[][] = [];
  displayedCards: Card[] = [];
  cardsPerPage = new FormControl<number>(100, [Validators.required, Validators.min(10), Validators.max(1000)]);
  currentPage = 0;
  isExporting = false;
  statusMessage = '';
  private updateSubject = new Subject<void>();

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
    if (this.cardsPerPage.valid && this.cardsPerPage.value !== null) {
      this.paginatedCards = [];
      for (let i = 0; i < this.cardsArray.length; i += this.cardsPerPage.value) {
        this.paginatedCards.push(this.cardsArray.slice(i, i + this.cardsPerPage.value));
      }
      this.updateDisplayedCards();
    }

  }

  updateDisplayedCards(): void {
    this.displayedCards = this.paginatedCards[this.currentPage] || [];
  }

  changePage(pageIndex: number): void {
    this.currentPage = pageIndex;
    this.updateDisplayedCards();
  }

  updateCardsPerPage(): void {
    this.updateSubject.next();
  }

  async exportToPDF(pageIndex: number) {
    this.isExporting = true;
    this.statusMessage = 'Preparando el PDF...';

    try {
      const targetCards = this.paginatedCards[pageIndex];
      const pdf = new jsPDF('p', 'mm', 'a4');
      const margin = 10;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const cardsPerPDFPage = 9;

      const totalPDFPages = Math.ceil(targetCards.length / cardsPerPDFPage);

      for (let pdfPageIndex = 0; pdfPageIndex < totalPDFPages; pdfPageIndex++) {
        const startIndex = pdfPageIndex * cardsPerPDFPage;
        const endIndex = Math.min(startIndex + cardsPerPDFPage, targetCards.length);
        this.displayedCards = targetCards.slice(startIndex, endIndex);
        await new Promise(resolve => setTimeout(resolve, 200));

        this.statusMessage = `Generando página ${pdfPageIndex + 1} de ${totalPDFPages}...`;

        const canvas = await html2canvas(this.cardsGrid.nativeElement, {
          scale: 2,
          backgroundColor: '#ffffff',
          logging: false,
          useCORS: true,
          allowTaint: true
        });

        const availableWidth = pageWidth - (margin * 2);
        const availableHeight = pageHeight - (margin * 2);
        const imageAspect = canvas.height / canvas.width;

        let finalWidth = availableWidth;
        let finalHeight = finalWidth * imageAspect;

        if (finalHeight > availableHeight) {
          finalHeight = availableHeight;
          finalWidth = finalHeight / imageAspect;
        }

        const xOffset = (pageWidth - finalWidth) / 2;
        const yOffset = (pageHeight - finalHeight) / 2;

        if (pdfPageIndex > 0) {
          pdf.addPage();
        }

        pdf.addImage(
          canvas.toDataURL('image/jpeg', 1.0),
          'JPEG',
          xOffset,
          yOffset,
          finalWidth,
          finalHeight
        );
      }

      this.displayedCards = this.paginatedCards[this.currentPage];
      pdf.save(`bingo-cards-page-${pageIndex + 1}.pdf`);

    } catch (error) {
      console.error('Error al exportar:', error);
      this.statusMessage = 'Error al generar el PDF';
    } finally {
      this.isExporting = false;
      this.updateDisplayedCards();
    }
  }
}

