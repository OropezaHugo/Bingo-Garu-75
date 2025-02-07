import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PrizeData} from '../models/round';
import {Game} from '../models/game';


@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  baseUrl = "http://localhost:5075/";
  private http = inject(HttpClient)

  getAllFinishedGames() {
    return this.http.get<Game[]>(`${this.baseUrl}Game/finished`);
  }

  getAllUnstartedGames() {
    return this.http.get<Game[]>(`${this.baseUrl}Game/unstarted`);
  }
  getGamePrizesById(id: number) {
    return this.http.get<PrizeData[]>(`${this.baseUrl}Prize/game/${id}`);
  }
}
