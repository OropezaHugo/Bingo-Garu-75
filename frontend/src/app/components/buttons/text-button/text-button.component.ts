import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-text-button',
  imports: [],
  standalone: true,
  templateUrl: './text-button.component.html',
  styleUrl: './text-button.component.scss'
})
export class TextButtonComponent {
  @Input() text: string = '';
  @Input() color: string = 'default';
  @Input() disabled: boolean = false;
  @Input() fontSizeClass: string = 'font-medium';
  @Input() fontWeightClass: string = 'weight-default';
}
