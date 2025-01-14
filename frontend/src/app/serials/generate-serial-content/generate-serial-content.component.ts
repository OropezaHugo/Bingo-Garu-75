import { Component } from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';

@Component({
  selector: 'app-generate-serial-content',
  imports: [
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './generate-serial-content.component.html',
  styleUrl: './generate-serial-content.component.scss'
})
export class GenerateSerialContentComponent {

}
