import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PrizeData} from '../models/round';
import {Game} from '../models/game';
import {environment} from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  baseUrl = environment.apiUrl;
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
