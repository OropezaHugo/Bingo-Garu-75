import { Component, ViewChild } from '@angular/core';
import { ColorPickerComponent } from '../../shared/color-picker/color-picker.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColorService } from '../../core/services/ColorService';
import { DEFAULT_COLOR_PALETTES } from '../../core/models/ColorPalletes';

type PaletteId = keyof typeof DEFAULT_COLOR_PALETTES;

@Component({
  selector: 'app-personalization-section',
  imports: [ColorPickerComponent],
  templateUrl: './personalization-page.component.html',
  styleUrl: './personalization-page.component.scss'
})
export class PersonalizationPageComponent {
  @ViewChild('colorPicker') colorPicker!: ColorPickerComponent;
  isColorPickerOpen = true;
  formGroup: FormGroup;
  selectedElement: string | null = null;
  currentPalette: PaletteId = 'default';

  StrokeColor = DEFAULT_COLOR_PALETTES.default.StrokeColor;
  BoxFillColor = DEFAULT_COLOR_PALETTES.default.BoxFillColor;
  CardFillColor = DEFAULT_COLOR_PALETTES.default.CardFillColor;
  CardNameColor = DEFAULT_COLOR_PALETTES.default.CardNameColor;
  BoxNumberColor = DEFAULT_COLOR_PALETTES.default.BoxNumberColor;
  CardNumberColor = DEFAULT_COLOR_PALETTES.default.CardNumberColor;

  boxes: string[] = Array(25).fill('').map((_, index) => `${index + 1}`);

  colorOptions = [
    { label: 'Border Color', value: 'StrokeColor', currentColor: this.StrokeColor },
    { label: 'Box Background', value: 'BoxFillColor', currentColor: this.BoxFillColor },
    { label: 'Card Background', value: 'CardFillColor', currentColor: this.CardFillColor },
    { label: 'Card Title Color', value: 'CardNameColor', currentColor: this.CardNameColor },
    { label: 'Box Number Color', value: 'BoxNumberColor', currentColor: this.BoxNumberColor },
    { label: 'Card Number Color', value: 'CardNumberColor', currentColor: this.CardNumberColor }
  ];

  constructor(private fb: FormBuilder, private colorService: ColorService) {
    this.formGroup = this.fb.group({
      color: ['#ffffff']
    });
  }

  selectElement(element: string, currentColor: string): void {
    this.selectedElement = element;
    if (this.colorPicker) {
      this.colorPicker.updateSelectedElement(element, currentColor);
    }
  }

  get colorPalettes() {
    return Object.entries(DEFAULT_COLOR_PALETTES).map(([key, value]) => ({
      id: key as PaletteId,
      ...value
    }));
  }

  applyPalette(paletteId: PaletteId) {
    const palette = DEFAULT_COLOR_PALETTES[paletteId];
    if (palette) {
      this.currentPalette = paletteId;
      this.StrokeColor = palette.StrokeColor;
      this.BoxFillColor = palette.BoxFillColor;
      this.CardFillColor = palette.CardFillColor;
      this.CardNameColor = palette.CardNameColor;
      this.BoxNumberColor = palette.BoxNumberColor;
      this.CardNumberColor = palette.CardNumberColor;

      this.colorOptions.forEach(option => {
        option.currentColor = palette[option.value as keyof typeof palette];
      });

      this.colorService.updateColors('palette', '', {
        StrokeColor: palette.StrokeColor,
        BoxFillColor: palette.BoxFillColor,
        CardFillColor: palette.CardFillColor,
        CardNameColor: palette.CardNameColor,
        BoxNumberColor: palette.BoxNumberColor,
        CardNumberColor: palette.CardNumberColor
      });
    }
  }


  onColorChange(event: { color: string; element: string | null }): void {
    if (event.element && event.color) {
      (this as any)[event.element] = event.color;

      const option = this.colorOptions.find(opt => opt.value === event.element);
      if (option) {
        option.currentColor = event.color;
      }

      this.colorService.updateColors(event.element, event.color, { [event.element]: event.color });
    }
  }

  openColorPicker(element: string): void {
    this.isColorPickerOpen = true;
    this.selectElement(element, (this as any)[element]);
  }
}
