import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateRoundsData, PostPrizeData, PrizeData, Round} from '../models/round';
import {GameService} from './game.service';
import {RoundPatternInfo, Pattern} from '../models/add-pattern-dialog-data';
import {map, Observable} from 'rxjs';
import {Card} from '../models/card';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoundService {
  baseUrl = environment.apiUrl;
  private http = inject(HttpClient)
  actualRounds = signal<Round[]>([])
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
    let asserts = patternMatrix.filter(value => value).length
    let withLastNumber = false;
    patternMatrix.forEach((patternMatrixCell, index) => {
      if (patternMatrixCell) {
        if (raffleNumbers.includes(cardContent[index]) || index === 12) {
          if (raffleNumbers.length > 0 && cardContent[index] == raffleNumbers[raffleNumbers.length - 1])
          {
            withLastNumber = true;
          }
          asserts -= 1
        }
      }
    })
    return (!(asserts > 0) && withLastNumber);
  }

  isBingoValidAndNotPassedOnAnyPattern(patternInfos: RoundPatternInfo[], cardContent: number[], raffleNumbers: number[]): boolean {
    let result = false
    patternInfos.forEach(pattern => {
      if (this.isBingoValidAndNotPassed(pattern.patternMatrix, cardContent, raffleNumbers)) {
        result = true
      }
    })
    return result
  }

  isBingoValid(patternMatrix: boolean[], cardContent: number[], raffleNumbers: number[]) {
    let asserts = patternMatrix.filter(value => value).length
    patternMatrix.forEach((patternMatrixCell, index) => {
      if (patternMatrixCell) {
        if (raffleNumbers.includes(cardContent[index]) || index === 12) {
          asserts -= 1
        }
      }
    })
    return (!(asserts > 0));
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
