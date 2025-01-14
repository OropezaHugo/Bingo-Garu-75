export interface Serial {
  id: number;
  name: string;
  cardQuantity: number;
  createdAt: Date;
}

export const ExampleSerials = [
  {
    id: 2,
    name: "serial truco",
    cardQuantity: 55,
    createdAt: new Date("2023-12-01T10:30:00"),
  },
  {
    id: 3,
    name: "poker night",
    cardQuantity: 52,
    createdAt: new Date("2023-10-01T10:30:00"),
  },
  {
    id: 4,
    name: "uno deluxe",
    cardQuantity: 108,
    createdAt: new Date("2023-02-01T10:30:00"),
  },
  {
    id: 5,
    name: "blackjack pro",
    cardQuantity: 52,
    createdAt: new Date("2023-10-01T10:30:00"),
  },
  {
    id: 6,
    name: "magic deck",
    cardQuantity: 60,
    createdAt: new Date("2023-03-01T10:30:00"),
  },
  {
    id: 7,
    name: "solitaire pack",
    cardQuantity: 54,
    createdAt: new Date("2023-06-01T10:30:00"),
  }
]

