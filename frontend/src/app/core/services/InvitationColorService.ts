import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvitationColorService {
  private colorsSource = new BehaviorSubject({
    BackgroundColor: '#ffffff',
    HeaderColor: '#ff9800',
    PrizeColor: '#4caf50',
    RoundInfoColor: '#3f51b5',
    OfferColor: '#e91e63'
  });

  colors$ = this.colorsSource.asObservable();

  updateColors(element: string, color: string, newColors: Partial<Record<string, string>>) {
    this.colorsSource.next({
      ...this.colorsSource.value,
      ...newColors,
    });
  }

  getCurrentColors() {
    return this.colorsSource.value;
  }
}

