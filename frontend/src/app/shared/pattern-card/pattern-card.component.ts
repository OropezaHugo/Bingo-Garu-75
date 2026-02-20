import {Component, input} from '@angular/core';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-pattern-card',
  imports: [],
  templateUrl: './pattern-card.component.html',
  styleUrl: './pattern-card.component.scss'
})
export class PatternCardComponent {

  editable = input.required<boolean>()
  pattern = input.required<boolean[]>();

  clickBox(event: MouseEvent, boxIndex: number) {
    if (this.editable()) {
      this.pattern()[boxIndex]= !this.pattern()[boxIndex];
    }
  }
}
