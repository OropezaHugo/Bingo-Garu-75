import {computed, inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game} from '../models/game';
import {RoundPatternInfo, Pattern} from '../models/add-pattern-dialog-data';
import {map, Observable} from "rxjs";
import {Serial} from "../models/serial";
import {GameCardInfo} from '../models/card';
import {PrizeData} from '../models/round';
import {SnackbarService} from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  baseUrl = "http://localhost:5075/";
  private http = inject(HttpClient)
  actualGame = signal<Game | undefined>(undefined)
  gameCards = signal<GameCardInfo[]>([])
  gamePrizes = signal<PrizeData[]>([])
  snackBar = inject(SnackbarService)

  getGameById(id: number) {
    return this.http.get<Game>(`${this.baseUrl}Game/${id}`).pipe(
        map(game => {
          this.actualGame.set(game);
        }),
    )
  }

  getActualGamePrizes() {
    this.createNewGame().subscribe({
      next: () => {
        this.http.get<PrizeData[]>(`${this.baseUrl}Prize/game/${this.actualGame()?.id}`).subscribe({
          next: (result) => {
            if (result) {
              console.log(result);
              this.gamePrizes.set(result);
            }
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

  finishGame() {
    this.getActualGamePrizes()
    this.updateGame({
      finished: true,
      id: this.actualGame()!.id,
      automaticRaffle: this.actualGame()!.automaticRaffle,
      randomPatterns: this.actualGame()!.randomPatterns,
      sharePrizes: this.actualGame()!.sharePrizes,
      inProgress: this.actualGame()!.inProgress,
    })
  }

  disposeActualGame() {
    localStorage.removeItem("gameId")
    this.gamePrizes.set([])
    this.gameCards.set([])
    this.actualGame.set(undefined)
  }

  attachSerialToActualGame(serial: Serial) {
    this.createNewGame().subscribe({
      next: () => {
        return this.http.post<boolean>(`${this.baseUrl}Serial/game`, {gameId: this.actualGame()?.id, serialId: serial.id}).subscribe({
          next: (result) => {
            if (result) {
              this.getGameById(this.actualGame()!.id).subscribe({
                next: () => {
                  this.getCardsByGameId()
                }
              })
              this.snackBar.success("serial adjunto correctamente")
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
}
