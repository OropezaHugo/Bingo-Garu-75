import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerComponent } from "../../components/color-picker/color-picker.component";
import { SerialColorsDTO } from '../../models/colorSerial';


@Component({
  selector: 'app-export-personalization-page',
  standalone: true,
  imports: [ReactiveFormsModule, ColorPickerComponent],
  templateUrl: './export-personalization-page.component.html',
  styleUrl: './export-personalization-page.component.scss'
})
export class ExportPersonalizationPageComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group<SerialColorsDTO>({
      StrokeColor: '#000000',
      BoxFillColor: '#FFFFFF',
      CardFillColor: '#EFEFEF',
      CardNameColor: '#123456',
      BoxNumberColor: '#654321',
      CardNumberColor: '#FF0000',
    });
  }

  onSave() {
    const serialColors: SerialColorsDTO = this.form.value;
    console.log('Colores seleccionados:', serialColors);
  }
}
