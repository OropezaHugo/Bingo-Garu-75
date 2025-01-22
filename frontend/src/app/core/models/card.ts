export interface Card {
  cardNumber: number;
  content: CardBox[]
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

/* card: Card = {
    cardNumber: 125,
    content: [
      {number: 70, marked: false},
      {number: 52, marked: false},
      {number: 48, marked: false},
      {number: 28, marked: false},
      {number: 49, marked: false},

      {number: 59, marked: false},
      {number: 27, marked: false},
      {number: 15, marked: false},
      {number: 19, marked: false},
      {number: 46, marked: false},

      {number: 55, marked: false},
      {number: 37, marked: false},
      {number: 100, marked: true},
      {number: 69, marked: false},
      {number: 36, marked: false},

      {number: 51, marked: false},
      {number: 35, marked: false},
      {number: 17, marked: false},
      {number: 39, marked: false},
      {number: 71, marked: false},

      {number: 44, marked: false},
      {number: 42, marked: false},
      {number: 73, marked: false},
      {number: 60, marked: false},
      {number: 32, marked: false}
    ]
  } */
