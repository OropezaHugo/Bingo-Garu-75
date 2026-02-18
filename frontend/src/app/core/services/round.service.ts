import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateRoundsData, PostPrizeData, PrizeData, Round} from '../models/round';
import {GameService} from './game.service';
import {RoundPatternInfo, Pattern} from '../models/add-pattern-dialog-data';
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoundService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient)
  actualRounds = signal<Round[]>([])
  actualRoundPatterns = signal<RoundPatternInfo[]>([])
  gameService = inject(GameService);

  raffleNumber(raffled: number[]) {
    let randomNumber = Math.floor(Math.random() * 75) + 1;
    while (raffled.includes(randomNumber)) {
      randomNumber = Math.floor(Math.random() * 75) + 1;
    }
    return randomNumber;
  }
  getPatternsByRoundId(roundId: number) {
    return this.http.get<Pattern[]>(`${this.baseUrl}Pattern/round/${roundId}`)
  }
  refreshPatterns(roundId: number) {
    this.getPatternsInfoByRoundId(roundId).subscribe({
      next: result => {
        this.actualRoundPatterns.set(result.filter(pattern => pattern.active));
      }
    })
  }
  getPatternsInfoByRoundId(roundId: number) {
    return this.http.get<RoundPatternInfo[]>(`${this.baseUrl}Pattern/round/${roundId}/info`)
  }
  addPatternToRound(roundId: number, patternId: number):Observable<void> {
    return this.http.post<boolean>(`${this.baseUrl}Pattern/round`, {roundId, patternId, active: true}).pipe(
      map(result => {
        if (result){
          this.getPatternsByRoundId(roundId);
          this.getPatternsInfoByRoundId(roundId);
        }
      })
    )
  }
  updatePatternInRound(roundInfo: RoundPatternInfo, roundId: number) {
    return this.http.put<boolean>(`${this.baseUrl}Pattern/round`,
      {
        roundId: roundId,
        patternId: roundInfo.id,
        targetPrice: roundInfo.targetPrice,
        active: roundInfo.active
      }).pipe(
      map(result => {
        if (result){
          this.getPatternsByRoundId(roundId);
          this.getPatternsInfoByRoundId(roundId);
        }
      })
    )
  }
  deletePatternFromRound(roundId: number, patternId: number) {
    return this.http.delete<boolean>(`${this.baseUrl}Pattern/${patternId}/round/${roundId}`)
  }
  getRoundsById(roundId: number) {
    return this.http.get<Round>(`${this.baseUrl}Round/${roundId}`)
  }
  getRounds(){
    this.gameService.createNewGame().subscribe({
      next: () => {
        return this.http.get<Round[]>(`${this.baseUrl}Round/game/${this.gameService.actualGame()?.id}`).subscribe({
          next: result => {
            this.actualRounds.set(result)
            let roundId = result.find(r => r.active)?.id
            if (roundId !== undefined) {
              this.refreshPatterns(roundId);
            }
          }
        })
      }
    })

  }
  updateRoundData(round: Round) {
    return this.http.put<Round>(`${this.baseUrl}Round/${round.id}`, round).subscribe({
      next: result => {
        this.getRounds()
      }
    })
  }

  isBingoValidAndNotPassed(patternMatrix: boolean[], cardContent: number[], raffleNumbers: number[]): boolean {
    const lastNumber = raffleNumbers[raffleNumbers.length - 1];
    let withLastNumber = false;
    const neededIndexes = patternMatrix.reduce((acc, val, idx) => {
      if (val) acc.push(idx);
      return acc;
    }, [] as number[]);

    for (const idx of neededIndexes) {
      const numberAtIndex = cardContent[idx];

      if (idx === 12) continue;

      if (!raffleNumbers.includes(numberAtIndex)) {
        return false;
      }

      if (numberAtIndex === lastNumber) {
        withLastNumber = true;
      }
    }

    return withLastNumber;
  }

  isBingoValidAndNotPassedOnAnyPattern(cardContent: number[], raffleNumbers: number[]): boolean {
    let result = false
    this.actualRoundPatterns().forEach(pattern => {
      if (this.isBingoValidAndNotPassed(pattern.patternMatrix, cardContent, raffleNumbers)) {
        result = true
      }
    })
    return result
  }

  isBingoValid(patternMatrix: boolean[], cardContent: number[], raffleNumbers: number[]) {
    const neededIndexes = patternMatrix.reduce((acc, val, idx) => {
      if (val) acc.push(idx);
      return acc;
    }, [] as number[]);

    for (const idx of neededIndexes) {
      const numberAtIndex = cardContent[idx];

      if (idx === 12) continue;

      if (!raffleNumbers.includes(numberAtIndex)) {
        return false;
      }

    }
    return true;
  }

  existsAnyWinnerInRoundPattern(roundId: number, patternId: number) {
    return this.http.get<boolean>(`${this.baseUrl}Round/${roundId}/pattern/${patternId}/winner`)
  }

  postPrize(prize: PostPrizeData) {
    this.gameService.createNewGame().subscribe({
      next: () => {
        return this.http.post<boolean>(`${this.baseUrl}Prize/game/${this.gameService.actualGame()?.id}`, prize).subscribe()
      }
    })
  }

  postRounds(roundsData: CreateRoundsData) {
    this.gameService.createNewGame().subscribe({
      next: () => {
        return this.http.post<boolean>(`${this.baseUrl}Round/game/${this.gameService.actualGame()?.id}`, roundsData).subscribe({
          next: result => {
            this.getRounds()
          }
        })
      }
    })
  }

  getPrizesByRoundId(roundId: number) {
    return this.http.get<PrizeData[]>(`${this.baseUrl}Prize/round/${roundId}`)
  }
}
