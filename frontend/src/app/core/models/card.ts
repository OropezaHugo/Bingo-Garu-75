export interface Card {
  cardNumber: number;
  content: CardBox[]
  lastNumber?: number;
}

export interface CardBox {
  number: number;
  marked: boolean;
}

export interface GameCardInfo {
  cardId: number;
  gameId: number;
  contentMatrix: number[];
  serialId: number;
  sold: boolean;
  userName: string;
  cardNumber: number;
}
