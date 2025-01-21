import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  imports: [ColorPickerModule, ReactiveFormsModule],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss'
})
export class ColorPickerComponent {
  @Output() colorChange = new EventEmitter<{color: string, element: string | null}>();
  @Input() isOpen: boolean = false;

  formGroup: FormGroup;
  format: 'hex' = 'hex';
  selectedElement: string | null = null;
  selectedElementLabel: string = '';

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      color: ['#ffffff']
    });
  }

  updateSelectedElement(element: string, currentColor: string) {
    this.selectedElement = element;
    this.formGroup.patchValue({ color: currentColor });

    const labelMap: { [key: string]: string } = {
      StrokeColor: 'Border Color',
      BoxFillColor: 'Box Background Color',
      CardFillColor: 'Card Background Color',
      CardNameColor: 'Card Title Color',
      BoxNumberColor: 'Box Number Color',
      CardNumberColor: 'Card Number Color'
    };

    this.selectedElementLabel = labelMap[element] || 'Select an element';
  }

  onColorSelect(event: any) {
    if (this.selectedElement) {
      this.colorChange.emit({
        color: event.value,
        element: this.selectedElement
      });
    }
  }
}
