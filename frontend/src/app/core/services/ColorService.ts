import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  private colorsSource = new BehaviorSubject({
    StrokeColor: '#000000',
    BoxFillColor: '#FFFFFF',
    CardFillColor: '#7b2cbf',
    CardNameColor: '#fca311',
    BoxNumberColor: '#7b2cbf',
    CardNumberColor: '#7b2cbf',
  });

  colors$ = this.colorsSource.asObservable();

  updateColors(newColors: Partial<Record<string, string>>) {
    this.colorsSource.next({
      ...this.colorsSource.value,
      ...newColors,
    });
  }
}
