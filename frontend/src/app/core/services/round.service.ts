import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CreateRoundsData, PrizeData, Round} from '../models/round';
import {GameService} from './game.service';
import {RoundPatternInfo, Pattern} from '../models/add-pattern-dialog-data';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoundService {
  baseUrl = "http://localhost:5075/";
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

  isBingoValid(patternMatrix: boolean[], cardContent: number[], raffleNumbers: number[]) {
    let asserts = patternMatrix.filter(value => value).length
    patternMatrix.forEach((patternMatrixCell, index) => {
      if (patternMatrixCell) {
        if (raffleNumbers.includes(cardContent[index]) || index === 12) {
          asserts -= 1
        }
      }
    })
    return !(asserts > 0);
  }

  postPrize(prize: PrizeData) {
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
}
