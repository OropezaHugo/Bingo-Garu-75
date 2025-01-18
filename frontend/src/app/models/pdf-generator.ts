import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Card, GameCardInfo } from '../models/card';
import { SerialColorsDTO } from '../models/colorSerial';

(pdfMake as any).vfs = pdfFonts.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  constructor() {}

  generateBingoCardsPDF(cards: GameCardInfo[], serialColors?: SerialColorsDTO) {
    const pageSize = {
      width: 612,
      height: 792
    };

    const cardWidth = pageSize.width / 2 - 40;
    const cardHeight = pageSize.height / 2 - 40;

    const docDefinition = {
      pageSize: { width: 612, height: 792 },
      pageMargins: [20, 20, 20, 20] as [number, number, number, number],
      content: this.createPagesContent(cards, cardWidth, cardHeight, serialColors),
    };

    pdfMake.createPdf(docDefinition).download('bingo-cards.pdf');
  }

  private createPagesContent(
    cards: GameCardInfo[],
    cardWidth: number,
    cardHeight: number,
    serialColors?: SerialColorsDTO
  ) {
    const content: any[] = [];
    const cardsPerPage = 4;

    for (let i = 0; i < cards.length; i += cardsPerPage) {
      const pageCards = cards.slice(i, i + cardsPerPage);
      const pageContent: any[] = [];

      for (let j = 0; j < pageCards.length; j++) {
        const card = pageCards[j];

        const xPos = j % 2 === 0 ? 0 : cardWidth + 40;
        const yPos = j < 2 ? 0 : cardHeight + 40;

        pageContent.push({
          absolutePosition: { x: xPos + 20, y: yPos + 20 },
          width: cardWidth,
          height: cardHeight,
          stack: [
            {
              table: {
                widths: Array(5).fill(cardWidth / 5),
                body: this.createBingoCardTable([card.contentMatrix])
              },
              layout: {
                hLineWidth: () => 1,
                vLineWidth: () => 1,
                hLineColor: () => 'black',
                vLineColor: () => 'black',
                paddingLeft: () => 5,
                paddingRight: () => 5,
                paddingTop: () => 5,
                paddingBottom: () => 5
              }
            },
            {
              text: `Serial: ${card.serialId} - Card: ${card.cardNumber}`,
              fontSize: 8,
              alignment: 'center',
              margin: [0, 5, 0, 0]
            }
          ]
        });
      }

      // Add page break if not the last page
      if (i + cardsPerPage < cards.length) {
        content.push(...pageContent, { text: '', pageBreak: 'after' });
      } else {
        content.push(...pageContent);
      }
    }

    return content;
  }

  private createBingoCardTable(matrix: number[][]) {
    const tableBody = [];

    tableBody.push(['B', 'I', 'N', 'G', 'O'].map(letter => ({
      text: letter,
      alignment: 'center',
      bold: true,
      fontSize: 14
    })));

    for (let row = 0; row < 5; row++) {
      const tableRow = matrix[row].map(num => ({
        text: num === 0 ? 'FREE' : num.toString(),
        alignment: 'center',
        fontSize: 12
      }));
      tableBody.push(tableRow);
    }

    return tableBody;
  }
}
