import { Component } from '@angular/core';
import { TextButtonComponent } from '../buttons/text-button/text-button.component';

@Component({
  selector: 'app-footer',
  imports: [TextButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
