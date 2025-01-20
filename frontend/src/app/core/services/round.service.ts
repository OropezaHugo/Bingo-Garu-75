import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PrizeData, Round} from '../../models/round';
import {GameService} from './game.service';

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
        if (raffleNumbers.includes(cardContent[index])){
          asserts -= 1
        }
      }
      if (index === 12) {
        asserts -=1
      }
    })
    return !(asserts > 0);
  }

  postPrize(prize: PrizeData) {
    return this.http.post<boolean>(`${this.baseUrl}Prize/game/${this.gameService.actualGame()?.id}`, prize)
  }
}
