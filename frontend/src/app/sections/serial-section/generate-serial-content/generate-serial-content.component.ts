import {Component, inject} from '@angular/core';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import { RectanglebuttonComponent } from '../../../shared/buttons/rectanglebutton/rectanglebutton.component';
import {SerialService} from '../../../core/services/serial.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-generate-serial-content',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    RectanglebuttonComponent
  ],
  templateUrl: './generate-serial-content.component.html',
  styleUrl: './generate-serial-content.component.scss'
})
export class GenerateSerialContentComponent {

}
