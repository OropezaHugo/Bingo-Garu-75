import {Card, GameCardInfo} from './card';
import {RoundPatternInfo} from './add-pattern-dialog-data';

export interface Round {
  id?: number;
  roundName: string;
  raffleNumbers: number[];
  gameId: number;
}

export interface VerifyCardDialogData {
  card: GameCardInfo,
  raffledNumbers: number[];
  patterns: RoundPatternInfo[];
  round: Round;
}
export interface CreateRoundsData {
  roundQuantity: number;
  hasBonusRound: boolean;
}

export interface PrizeData {
  id?: number;
  prizeAmount: number;
  userName: string;
  patternId: number;
  roundId: number;
  cardId: number;
  cardNumber: number;
  cardContentMatrix: number[];
}

export interface PostPrizeData {
  id?: number;
  prizeAmount: number;
  userName: string;
  patternId: number;
  roundId: number;
  cardId: number;
}
export const MockGameRounds: Round[] = [
  {
    id: 1,
    roundName: "Round 1",
    raffleNumbers: [73, 8, 58, 6, 51, 36, 61, 47, 74, 64, 15, 14, 11, 49, 17, 27, 55, 1, 75, 39, 52, 16, 20, 57, 42],
    gameId: 1
  },
  {
    id: 2,
    roundName: "Round 2",
    raffleNumbers: [47, 41, 66, 57, 4, 23, 63, 15, 34, 24, 55, 50, 30, 35, 70, 8, 10, 7, 6, 14, 40, 69, 32, 58, 46, 61, 1, 64, 51, 3, 5, 52],
    gameId: 1
  },
  {
    id: 3,
    roundName: "Round 3",
    raffleNumbers: [74, 33, 10, 25, 61, 55, 51, 2, 14, 58, 45, 35, 52, 43, 31, 15, 7, 22, 60, 20, 23, 47, 37, 30, 13, 3, 19, 38, 41],
    gameId: 1
  },
  {
    id: 4,
    roundName: "Round 4",
    raffleNumbers: [10, 25, 34, 20, 31, 3, 12, 58, 7, 68, 46, 9, 65, 11, 62, 70, 63, 22, 21, 51, 48, 17, 45, 54, 13, 1, 73, 27, 55, 2, 49, 56, 57],
    gameId: 1
  },
  {
    id: 5,
    roundName: "Round 5",
    raffleNumbers: [35, 49, 31, 29, 18, 26, 20, 27, 58, 30, 73, 50, 7, 75, 46, 34, 28, 41, 25, 16, 57, 23, 48, 11, 19, 42, 69, 6, 56, 74, 32, 60, 8],
    gameId: 1
  }
]

export const BingoNumbers: number[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
  41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
  51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
  71, 72, 73, 74, 75
]
