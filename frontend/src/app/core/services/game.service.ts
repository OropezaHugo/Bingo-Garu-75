import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Game} from '../../models/game';
import {Pattern} from '../../models/add-pattern-dialog-data';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  baseUrl = "http://localhost:5075/";
  private http = inject(HttpClient)
  actualGame = signal<Game | undefined>(undefined)
  gamePatterns = signal<Pattern[]>([])

  getGameById(id: number) {
    return this.http.get<Game>(`${this.baseUrl}Game/${id}`).subscribe({
      next: (result) => {
        this.actualGame.set(result)
      }
    })
  }
  getActualGamePatterns() {
    return this.http.get<Pattern[]>(`${this.baseUrl}Pattern/${this.actualGame()?.id}/game`).subscribe({
      next: (result) => {
        this.gamePatterns.set(result)
      }
    })
  }
  createNewGame() {
    return this.http.post<Game>(`${this.baseUrl}Game`, {}).subscribe({
      next: (result) => {
        if (result) {
          this.getGameById(result.id)
        }
      }
    })
  }

  updateGame(newGame: Game) {
    return this.http.put(`${this.baseUrl}Game/${newGame.id}`, {automaticRaffle: newGame.automaticRaffle, randomPatterns: newGame.randomPatterns, sharePrizes: newGame.sharePrizes}).subscribe({
      next: (result) => {
        if (result) {
          this.getGameById(newGame.id)
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
}
