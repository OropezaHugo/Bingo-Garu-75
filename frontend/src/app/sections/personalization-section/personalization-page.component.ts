import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ColorPickerComponent } from '../../shared/color-picker/color-picker.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColorService } from '../../core/services/ColorService';
import { DEFAULT_COLOR_PALETTES } from '../../core/models/ColorPalletes';
import { SerialService } from '../../core/services/serial.service';
import { Serial } from '../../core/models/serial';

type PaletteId = keyof typeof DEFAULT_COLOR_PALETTES;

@Component({
  selector: 'app-personalization-section',
  imports: [ColorPickerComponent],
  templateUrl: './personalization-page.component.html',
  styleUrl: './personalization-page.component.scss'
})
export class PersonalizationPageComponent implements OnInit, AfterViewInit {
  @ViewChild('colorPicker') colorPicker!: ColorPickerComponent;
  isColorPickerOpen = true;

  selectedElement: string | null = null;
  serialService = inject(SerialService)
  serial: Serial | undefined = undefined
  currentPalette: PaletteId = 'default';

  StrokeColor = DEFAULT_COLOR_PALETTES.default.StrokeColor;
  BoxFillColor = DEFAULT_COLOR_PALETTES.default.BoxFillColor;
  CardFillColor = DEFAULT_COLOR_PALETTES.default.CardFillColor;
  CardNameColor = DEFAULT_COLOR_PALETTES.default.CardNameColor;
  BoxNumberColor = DEFAULT_COLOR_PALETTES.default.BoxNumberColor;
  CardNumberColor = DEFAULT_COLOR_PALETTES.default.CardNumberColor;

  boxes: string[] = Array(25).fill('').map((_, index) => `${index + 1}`);

  colorOptions = [
    { label: 'Border Color', value: 'strokeColor', currentColor: this.StrokeColor },
    { label: 'Box Background', value: 'boxFillColor', currentColor: this.BoxFillColor },
    { label: 'Card Background', value: 'cardFillColor', currentColor: this.CardFillColor },
    { label: 'Card Title Color', value: 'cardNameColor', currentColor: this.CardNameColor },
    { label: 'Box Number Color', value: 'boxNumberColor', currentColor: this.BoxNumberColor },
    { label: 'Card Number Color', value: 'cardNumberColor', currentColor: this.CardNumberColor }
  ];


  ngOnInit(): void {
      this.serialService.getSerialById(this.serialService.serial()?.id!).subscribe({
        next: v => {
          this.serial = v
          this.StrokeColor = v.strokeColor
          this.BoxFillColor = v.boxFillColor
          this.BoxNumberColor = v.boxNumberColor
          this.CardFillColor = v.cardFillColor
          this.CardNumberColor = v.cardNumberColor
          this.CardNameColor = v.cardNameColor
        }
      })
  }
  ngAfterViewInit(): void {
    this.serialService.getSerialById(this.serialService.serial()?.id!).subscribe({
      next: v => {
        this.serial = v
        this.StrokeColor = v.strokeColor
        this.BoxFillColor = v.boxFillColor
        this.BoxNumberColor = v.boxNumberColor
        this.CardFillColor = v.cardFillColor
        this.CardNumberColor = v.cardNumberColor
        this.CardNameColor = v.cardNameColor
        this.serialService.serial.set(v)
      }
    })
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
      this.serialService.updateSerial({
        serialName: this.serial?.serialName!,
        boxFillColor: this.BoxFillColor,
        boxNumberColor: this.BoxNumberColor,
        cardFillColor: this.CardFillColor,
        cardNameColor: this.CardNameColor,
        cardNumberColor: this.CardNumberColor,
        cardQuantity: this.serial?.cardQuantity!,
        creationDate: this.serial?.creationDate!,
        id: this.serial?.id!,
        strokeColor: this.StrokeColor
      }).subscribe({
        next: ser => {
          this.serialService.getSerialById(this.serialService.serial()?.id!).subscribe({
            next: v => {
              this.serial = v
              this.StrokeColor = v.strokeColor
              this.BoxFillColor = v.boxFillColor
              this.BoxNumberColor = v.boxNumberColor
              this.CardFillColor = v.cardFillColor
              this.CardNumberColor = v.cardNumberColor
              this.CardNameColor = v.cardNameColor
              this.serialService.serial.set(v)
            }
          })
        }
      })
    }
  }


  onColorChange(event: { color: string; element: string | null }): void {
    if (event.element && event.color) {
      (this as any)[event.element] = event.color;

      const option = this.colorOptions.find(opt => opt.value === event.element);
      if (option) {
        option.currentColor = event.color;
      }

      this.serialService.updateSerial({

        serialName: this.serial?.serialName!,
        boxFillColor: this.BoxFillColor,
        boxNumberColor: this.BoxNumberColor,
        cardFillColor: this.CardFillColor,
        cardNameColor: this.CardNameColor,
        cardNumberColor: this.CardNumberColor,
        cardQuantity: this.serial?.cardQuantity!,
        creationDate: this.serial?.creationDate!,
        id: this.serial?.id!,
        strokeColor: this.StrokeColor,
        [event.element]: event.color
      }).subscribe({
        next: ser => {
          this.serialService.getSerialById(this.serialService.serial()?.id!).subscribe({
            next: v => {
              this.serial = v
              this.StrokeColor = v.strokeColor
              this.BoxFillColor = v.boxFillColor
              this.BoxNumberColor = v.boxNumberColor
              this.CardFillColor = v.cardFillColor
              this.CardNumberColor = v.cardNumberColor
              this.CardNameColor = v.cardNameColor
              this.serialService.serial.set(v)
            }
          })
        }
      })
    }
  }

  openColorPicker(element: string): void {
    this.isColorPickerOpen = true;
    this.selectElement(element, (this as any)[element]);
  }
}
