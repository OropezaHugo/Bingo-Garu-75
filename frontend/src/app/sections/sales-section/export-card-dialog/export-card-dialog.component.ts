import {Component, inject, model} from '@angular/core';
import { Card, CardBox, } from '../../../core/models/card';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { BingoCardComponent } from "../../../shared/bingo-card/bingo-card.component";
import { MatFormField, MatFormFieldModule, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { GameService } from '../../../core/services/game.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { RectanglebuttonComponent } from '../../../shared/buttons/rectanglebutton/rectanglebutton.component';

@Component({
  selector: 'app-export-card-dialog',
  imports: [
    BingoCardComponent,
    MatDialogTitle,
    MatLabel,
    MatInput,
    MatDialogActions,
    MatDialogContent,
    MatFormField,
    MatHint,
    MatFormFieldModule,
    ReactiveFormsModule,
    RectanglebuttonComponent
  ],
  templateUrl: './export-card-dialog.component.html',
  styleUrl: './export-card-dialog.component.scss'
})
export class ExportCardDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ExportCardDialogComponent>);
  readonly gameService = inject(GameService);

  searchForm = new FormGroup({
    cardIdControl: new FormControl<string>('', [Validators.required])
  });

  previewCard: Card | null = null;
  errorMessage: string | null = null;

  onSearch() {
    this.errorMessage = null;
    const cardIdControlValue = this.searchForm.value.cardIdControl;

    if (!cardIdControlValue || isNaN(Number(cardIdControlValue))) {
      this.errorMessage = 'Por favor, ingrese un ID numérico válido.';
      return;
    }

    const cardNumber = Number(this.searchForm.value.cardIdControl) || 0;
    const foundCard = this.gameService.gameCards().find(card => card.cardNumber === cardNumber);

    if (foundCard) {
      this.previewCard = {
        cardNumber: cardNumber,
        content: foundCard.contentMatrix.map<CardBox>(value => ({
          number: value,
          marked: false
        }))
      };
    } else {
      this.errorMessage = `No se encontró ninguna carta con el ID ${cardNumber}.`;
      this.previewCard = null;
    }
  }

  exportToPDF() {
    const cardElement = document.querySelector('.card-preview') as HTMLElement;
    if (cardElement && this.previewCard) {
      const cardNumber = this.previewCard.cardNumber;
      html2canvas(cardElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(`carta_${cardNumber}.pdf`);
      });
    }
  }

  exportToPNG() {
    const cardElement = document.querySelector('.card-preview') as HTMLElement;
    if (cardElement && this.previewCard) {
      const cardNumber = this.previewCard.cardNumber;
      html2canvas(cardElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `carta_${cardNumber}.png`;
        link.click();
      });
    }
  }
}