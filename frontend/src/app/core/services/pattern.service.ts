import {inject, Injectable, signal} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RoundPatternInfo, NewPatternDialogData, Pattern} from '../models/add-pattern-dialog-data';
import {GameService} from './game.service';

@Injectable({
  providedIn: 'root'
})
export class PatternService {

  baseUrl = "http://localhost:5075/";
  private http = inject(HttpClient)
  constructor() {
    this.getPatterns()
  }
  patterns = signal<Pattern[]>([])
  getPatterns(filterName?: string){
    let params = new HttpParams()
    if(filterName){
      params = params.append("name", filterName);
    }
    return this.http.get<Pattern[]>(this.baseUrl + 'Pattern', {params: params}).subscribe({
      next: result => {
        this.patterns.set(result)
      }
    });
  }

  getPatternById(patternId: number){
    return this.http.get<Pattern>(this.baseUrl + 'Pattern/' + patternId)
  }

  postPattern(pattern: NewPatternDialogData){
    return this.http.post<boolean>(this.baseUrl + 'Pattern', pattern).subscribe({
      next: result => {
        if (result) {
          this.getPatterns()
        }
      }
    })
  }

  updatePattern(pattern: Pattern){
    return this.http.put<boolean>(this.baseUrl + 'Pattern/' + pattern.id, {patternMatrix: pattern.patternMatrix, patternName: pattern.patternName}).subscribe({
      next: result => {
        if (result) {
          this.getPatterns()
        }
      },
      error: result => {
        if (result) {
          this.getPatterns()
        }
      }
    })
  }

  deletePattern(id: number){
    return this.http.delete<boolean>(this.baseUrl + 'Pattern/' + id).subscribe({
      next: result => {
        if (result) {
          this.getPatterns()
        }
      }
    })
  }
}
