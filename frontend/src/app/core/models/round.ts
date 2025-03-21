import {GameCardInfo} from './card';
import {RoundPatternInfo} from './add-pattern-dialog-data';

export interface Round {
  id?: number;
  roundName: string;
  raffleNumbers: number[];
  gameId: number;
  active: boolean;
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

export const BingoNumbers: number[] = [
  1, 16, 31, 46, 61,
  2, 17, 32, 47, 62,
  3, 18, 33, 48, 63,
  4, 19, 34, 49, 64,
  5, 20, 35, 50, 65,
  6, 21, 36, 51, 66,
  7, 22, 37, 52, 67,
  8, 23, 38, 53, 68,
  9, 24, 39, 54, 69,
  10, 25, 40, 55, 70,
  11, 26, 41, 56, 71,
  12, 27, 42, 57, 72,
  13, 28, 43, 58, 73,
  14, 29, 44, 59, 74,
  15, 30, 45, 60, 75
]
