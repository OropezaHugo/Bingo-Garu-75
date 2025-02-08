export interface Game {
  id: number;
  createdAt?: Date;
  targetStartDate?: string;
  automaticRaffle: boolean;
  randomPatterns: boolean;
  sharePrizes: boolean;
  inProgress: boolean;
  finished: boolean;
}
