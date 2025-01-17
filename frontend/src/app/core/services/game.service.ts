import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game} from '../../models/game';
import {Pattern} from '../../models/add-pattern-dialog-data';
import {map} from "rxjs";
import {Serial} from "../../models/serial";
import {GameCardInfo} from '../../models/card';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  baseUrl = "http://localhost:5075/";
  private http = inject(HttpClient)
  actualGame = signal<Game | undefined>(undefined)
  gamePatterns = signal<Pattern[]>([])
  gameCards = signal<GameCardInfo[]>([])

  getGameById(id?: number) {
    return this.http.get<Game>(`${this.baseUrl}Game/${id}`).pipe(
        map(game => {
          this.actualGame.set(game);
          this.getActualGamePatterns()
          this.getCardsByGameId()
        }),
    )
  }
  getActualGamePatterns() {
    return this.http.get<Pattern[]>(`${this.baseUrl}Pattern/${this.actualGame()?.id}/game`).subscribe({
      next: (result) => {
        this.gamePatterns.set(result)
      }
    })
  }
  createNewGame() {
    let id =  localStorage.getItem("gameId")
    if (id != null) {
      let idNumber = +id
      return this.getGameById(idNumber).subscribe()
    }
    return this.http.post<Game>(`${this.baseUrl}Game`, {}).subscribe({
      next: (result) => {
        if (result) {
          this.getGameById(result.id).subscribe()
          localStorage.setItem("gameId", result.id.toString())
        }
      }
    })
  }

  updateGame(newGame: Game) {
    return this.http.put(`${this.baseUrl}Game/${newGame.id}`, {automaticRaffle: newGame.automaticRaffle, randomPatterns: newGame.randomPatterns, sharePrizes: newGame.sharePrizes}).subscribe({
      next: (result) => {
        if (result) {
          this.getGameById(newGame.id).subscribe()
        }
      }
    })
  }

  addPatternToActualGame(patternId: number) {
    return this.http.post<boolean>(`${this.baseUrl}Pattern/game`, {gameId: this.actualGame()?.id,patternId: patternId}).subscribe({
      next: (result) => {
        if (result) {
          this.getActualGamePatterns()
        }
      }
    })
  }

  deletePatternFromActualGame(patternId: number) {
    return this.http.delete<boolean>(`${this.baseUrl}Pattern/${patternId}/game/${this.actualGame()?.id}`).subscribe({
      next: (result) => {
        if (result) {
          this.getActualGamePatterns()
        }
      }
    })
  }

  finishGame() {
    localStorage.removeItem("gameId");
    this.actualGame.set(undefined)
  }

  attachSerialToActualGame(serial: Serial) {
    return this.http.post<boolean>(`${this.baseUrl}Serial/game`, {gameId: this.actualGame()?.id, serialId: serial.id}).subscribe({
      next: (result) => {
        console.log(result);
        if (result) {
          console.log(result);
          this.getGameById(this.actualGame()?.id).subscribe()
        }
      }
    })
  }

  getCardsByGameId() {
    return this.http.get<GameCardInfo[]>(`${this.baseUrl}Card/game/${this.actualGame()?.id}`).subscribe({
      next: value => {
        console.log("llegue")
        this.gameCards.set(value)
      }
    })
  }

  sellCard(card: GameCardInfo) {
      return this.http.post(`${this.baseUrl}Card/game`,
        {
          gameId: card.gameId,
          cardId: card.cardId,
          sold: card.sold,
          userName: card.userName
        }).subscribe({
        next: (result) => {
          if (result) {
            this.getCardsByGameId()
          }
        }
      })
  }
}
