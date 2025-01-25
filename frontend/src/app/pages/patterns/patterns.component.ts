import { Component } from '@angular/core';
import {
  PatternListComponentComponent
} from '../../sections/pattern-section/pattern-list-component/pattern-list-component.component';

@Component({
  selector: 'app-patterns',
  imports: [
    PatternListComponentComponent
  ],
  templateUrl: './patterns.component.html',
  styleUrl: './patterns.component.scss'
})
export class PatternsComponent {

}
