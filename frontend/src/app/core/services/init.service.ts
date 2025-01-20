import {inject, Injectable} from '@angular/core';
import {GameService} from './game.service';
import {forkJoin, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private gameService = inject(GameService);

  init() {
    const gameIdString = localStorage.getItem("cart_id");
    let gameId = undefined
    if (gameIdString) {
      gameId = +gameIdString
    }
    const game$ = gameId ? this.gameService.createNewGame() : of(null);
    return forkJoin({
      game$: game$
    });
  }
}
