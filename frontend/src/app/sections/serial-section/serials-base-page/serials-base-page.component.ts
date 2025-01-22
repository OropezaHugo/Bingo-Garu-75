import { Component } from '@angular/core';

import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-serial-section-base-page',
  imports: [
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './serials-base-page.component.html',
  styleUrl: './serials-base-page.component.scss'
})
export class SerialsBasePageComponent {

}
