import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-rectanglebutton',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './rectanglebutton.component.html',
  styleUrl: './rectanglebutton.component.scss'
})
export class RectanglebuttonComponent {
  @Input() text: string = 'Button';
  @Input() color: string = 'primary';
  @Input() disabled: boolean = false;
  @Input() heightClass: string = '50px';
  @Input() widthClass: string = '150px';
  @Input() fontSize: string = '16px';
}
