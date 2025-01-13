import { Component } from '@angular/core';
import { TextButtonComponent } from '../buttons/text-button/text-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TextButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
