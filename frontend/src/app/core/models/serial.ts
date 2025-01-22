export interface Serial {
  id: number;
  serialName: string;
  cardQuantity: number;
  creationDate: Date;
  strokeColor: string;
  boxFillColor: string;
  cardFillColor: string;
  CardNameColor: string;
  boxNumberColor: string;
  cardNumberColor: string;
}

export interface NewSerialData {
  cardNumber: number;
  serialName?: string;
}
