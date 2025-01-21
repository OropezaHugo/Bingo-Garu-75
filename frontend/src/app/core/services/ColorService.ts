import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private colorsSource = new BehaviorSubject({
    StrokeColor: '#000000',
    BoxFillColor: '#FFFFFF',
    CardFillColor: '#FFFFFF',
    CardNameColor: '#000000',
    BoxNumberColor: '#000000',
    CardNumberColor: '#000000',
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
