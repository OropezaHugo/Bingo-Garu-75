import { Component } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {SerialsBasePageContentComponent} from '../serials-base-page-content/serials-base-page-content.component';
import {GenerateSerialContentComponent} from '../generate-serial-content/generate-serial-content.component';
import {AttachSerialContentComponent} from '../attach-serial-content/attach-serial-content.component';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-serials-base-page',
  imports: [
    MatIcon,
    SerialsBasePageContentComponent,
    GenerateSerialContentComponent,
    AttachSerialContentComponent,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './serials-base-page.component.html',
  styleUrl: './serials-base-page.component.scss'
})
export class SerialsBasePageComponent {

}
