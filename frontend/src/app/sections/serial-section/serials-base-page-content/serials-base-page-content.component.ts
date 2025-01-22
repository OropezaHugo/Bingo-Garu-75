import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-serial-section-base-page-content',
  imports: [
    MatIcon,
    RouterLink
  ],
  templateUrl: './serials-base-page-content.component.html',
  styleUrl: './serials-base-page-content.component.scss'
})
export class SerialsBasePageContentComponent {

}
