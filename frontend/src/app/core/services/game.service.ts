import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game} from '../../models/game';
import {GamePatternInfo, Pattern} from '../../models/add-pattern-dialog-data';
import {map, Observable} from "rxjs";
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
  gamePatternsInfo = signal<GamePatternInfo[]>([])

  getGameById(id: number) {
    return this.http.get<Game>(`${this.baseUrl}Game/${id}`).pipe(
        map(game => {
          this.actualGame.set(game);
        }),
    )
  }
  getActualGamePatterns() {
    this.createNewGame().subscribe({
      next: () => {
        return this.http.get<Pattern[]>(`${this.baseUrl}Pattern/${this.actualGame()?.id}/game`).subscribe({
          next: (result) => {
            this.gamePatterns.set(result);
          }
        })
      }
    })
  }

  getActualGamePatternsInfo() {
    this.createNewGame().subscribe({
      next: () => {
        return this.http.get<GamePatternInfo[]>(`${this.baseUrl}Pattern/game/${this.actualGame()?.id}/prizes`).subscribe({
          next: (result) => {
            this.gamePatternsInfo.set(result)
          }
        })
      }
    })
  }
  createNewGame() {
    let id =  localStorage.getItem("gameId")
    if (id != null) {
      let idNumber = +id
      return this.getGameById(idNumber)
    }
    return this.http.post<Game>(`${this.baseUrl}Game`, {}).pipe(
      map((result) => {
        if (result) {
          localStorage.setItem("gameId", result.id.toString())
          this.getGameById(result.id).subscribe()
        }
      })
    )
  }

  updateGame(newGame: Game) {
    return this.http.put(`${this.baseUrl}Game/${newGame.id}`, newGame).subscribe({
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
          this.getActualGamePatternsInfo()
        }
      }
    })
  }

  deletePatternFromActualGame(patternId: number) {
    return this.http.delete<boolean>(`${this.baseUrl}Pattern/${patternId}/game/${this.actualGame()?.id}`).subscribe({
      next: (result) => {
        if (result) {
          this.getActualGamePatterns()
          this.getActualGamePatternsInfo()
        }
      }
    })
  }

  finishGame() {
    localStorage.removeItem("gameId");
    this.actualGame.set(undefined)
  }

  attachSerialToActualGame(serial: Serial) {
    this.createNewGame().subscribe({
      next: () => {
        return this.http.post<boolean>(`${this.baseUrl}Serial/game`, {gameId: this.actualGame()?.id, serialId: serial.id}).subscribe({
          next: (result) => {
            if (result) {
              this.getGameById(this.actualGame()!.id).subscribe()
            }
          }
        })
      }
    })

  }

  getCardsByGameId() {
    this.createNewGame().subscribe({
      next: () => {
        return this.http.get<GameCardInfo[]>(`${this.baseUrl}Card/game/${this.actualGame()?.id}`).subscribe({
          next: value => {
            this.gameCards.set(value)
          }
        })
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



  updateGamePatternInfo(gamePattern: GamePatternInfo) {
    return this.http.put<boolean>(this.baseUrl + 'Pattern/game/prizes', {
      gameId: this.actualGame()?.id,
      patternId: gamePattern.id,
      targetPrice: gamePattern.targetPrice,
      active: gamePattern.active
    }).subscribe({
      next: result => {
        if (result) {
          this.getActualGamePatterns()
          this.getActualGamePatternsInfo()
          this.getCardsByGameId()
        }
      }
    })
  }
}
