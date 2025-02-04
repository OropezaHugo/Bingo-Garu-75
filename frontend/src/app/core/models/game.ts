export interface Game {
  id: number;
  createdAt?: Date;
  targetStartDate?: Date;
  automaticRaffle: boolean;
  randomPatterns: boolean;
  sharePrizes: boolean;
  inProgress: boolean;
  finished: boolean;
}
