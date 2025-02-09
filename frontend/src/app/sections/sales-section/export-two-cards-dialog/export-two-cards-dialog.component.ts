import { Component, inject } from '@angular/core';
import { Card, CardBox } from '../../../core/models/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { GameService } from '../../../core/services/game.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { PersonalBingoCardComponent } from '../../../shared/personal-bingo-card/personal-bingo-card.component';
import { RectanglebuttonComponent } from '../../../shared/buttons/rectanglebutton/rectanglebutton.component';
import { MatButton } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-export-two-cards-dialog',
  standalone: true,
  imports: [
    PersonalBingoCardComponent,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    ReactiveFormsModule,
    RectanglebuttonComponent,
    MatInputModule,
    MatButton
  ],
  templateUrl: './export-two-cards-dialog.component.html',
  styleUrl: './export-two-cards-dialog.component.scss'
})
export class ExportTwoCardsDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ExportTwoCardsDialogComponent>);
  readonly gameService = inject(GameService);

  searchForm = new FormGroup({
    cardId1Control: new FormControl<string>('', [Validators.required]),
    cardId2Control: new FormControl<string>('', [Validators.required])
  });

  previewCards: Card[] = [];
  errorMessage: string | null = null;

  onSearch() {
    this.errorMessage = null;
    const cardId1 = this.searchForm.value.cardId1Control;
    const cardId2 = this.searchForm.value.cardId2Control;

    if (!cardId1 || !cardId2 || isNaN(Number(cardId1)) || isNaN(Number(cardId2))) {
      this.errorMessage = 'Por favor, ingrese IDs numéricos válidos para ambas cartas.';
      return;
    }

    const cardNumber1 = Number(cardId1);
    const cardNumber2 = Number(cardId2);

    if (cardNumber1 === cardNumber2) {
      this.errorMessage = 'Por favor, ingrese IDs diferentes para cada carta.';
      return;
    }

    const foundCard1 = this.gameService.gameCards().find(card => card.cardNumber === cardNumber1);
    const foundCard2 = this.gameService.gameCards().find(card => card.cardNumber === cardNumber2);

    this.previewCards = [];

    if (foundCard1 && foundCard2) {
      this.previewCards = [
        {
          cardNumber: cardNumber1,
          content: foundCard1.contentMatrix.map<CardBox>(value => ({
            number: value,
            marked: false
          }))
        },
        {
          cardNumber: cardNumber2,
          content: foundCard2.contentMatrix.map<CardBox>(value => ({
            number: value,
            marked: false
          }))
        }
      ];
    } else {
      const notFoundIds = [];
      if (!foundCard1) notFoundIds.push(cardNumber1);
      if (!foundCard2) notFoundIds.push(cardNumber2);
      this.errorMessage = `No se encontraron cartas con los siguientes IDs: ${notFoundIds.join(', ')}.`;
    }
  }

  async exportToPDF() {
    if (this.previewCards.length === 0) return;

    const cardElements = document.querySelectorAll('.card-preview-element') as NodeListOf<HTMLElement>;
    if (cardElements.length === 0) return;

    const scale = 3;

    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexDirection = 'row';
    container.style.justifyContent = 'center';
    container.style.width = 'fit-content';

    cardElements.forEach(element => {
      const clone = element.cloneNode(true) as HTMLElement;
      container.appendChild(clone);
    });

    document.body.appendChild(container);

    const canvas = await html2canvas(container, {
      scale: scale,
      width: container.scrollWidth,
      height: container.scrollHeight,
    });

    document.body.removeChild(container);

    const imgWidth = canvas.width / scale;
    const imgHeight = canvas.height / scale;

    const orientation = imgWidth > imgHeight ? 'landscape' : 'portrait';
    const pdf = new jsPDF({
      orientation: orientation,
      unit: 'px',
      format: [imgWidth, imgHeight]
    });

    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    pdf.save(`cartas_${this.previewCards.map(card => card.cardNumber).join('_')}.pdf`);
  }

  async exportToPNG() {
    if (this.previewCards.length === 0) return;

    const cardElements = document.querySelectorAll('.card-preview-element') as NodeListOf<HTMLElement>;
    if (cardElements.length === 0) return;

    const scale = 4;
    const canvases = await Promise.all(
      Array.from(cardElements).map(element =>
        html2canvas(element, {
          scale: scale,
          width: element.scrollWidth,
          height: element.scrollHeight,
        })
      )
    );

    const combinedCanvas = document.createElement('canvas');
    const ctx = combinedCanvas.getContext('2d');
    if (!ctx) return;

    combinedCanvas.width = canvases[0].width * canvases.length;
    combinedCanvas.height = canvases[0].height;

    canvases.forEach((canvas, index) => {
      ctx.drawImage(canvas, canvas.width * index, 0);
    });

    const imgData = combinedCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imgData;
    link.download = `cartas_${this.previewCards.map(card => card.cardNumber).join('_')}.png`;
    link.click();
  }
}
