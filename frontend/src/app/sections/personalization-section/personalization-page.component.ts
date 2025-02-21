import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ColorPickerComponent } from '../../shared/color-picker/color-picker.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColorService } from '../../core/services/ColorService';
import { DEFAULT_COLOR_PALETTES } from '../../core/models/ColorPalletes';
import { SerialService } from '../../core/services/serial.service';
import { Serial } from '../../core/models/serial';
import { SnackbarService } from '../../core/services/snackbar.service';
import {MatIcon} from '@angular/material/icon';


type PaletteId = keyof typeof DEFAULT_COLOR_PALETTES;

@Component({
  selector: 'app-personalization-section',
  imports: [ColorPickerComponent, MatIcon],
  templateUrl: './personalization-page.component.html',
  styleUrl: './personalization-page.component.scss'
})
export class PersonalizationPageComponent implements OnInit, AfterViewInit {
  @ViewChild('colorPicker') colorPicker!: ColorPickerComponent;
  isColorPickerOpen = true;
  showJsonInput = false;
  colorConfigText = '#333333';
  currentColorJSON = '';

  selectedElement: string | null = null;
  serialService = inject(SerialService)
  serial: Serial | undefined = undefined
  currentPalette: PaletteId = 'default';
  snackbar = inject(SnackbarService)

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
          this.updateColorJSON();
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
        this.updateColorJSON();
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
      this.updateSerialColors();
      this.updateColorJSON();
    }
  }

  onColorChange(event: { color: string; element: string | null }): void {
    if (event.element && event.color) {
      (this as any)[event.element] = event.color;

      const option = this.colorOptions.find(opt => opt.value === event.element);
      if (option) {
        option.currentColor = event.color;
      }

      this.updateSerialColors(event.element, event.color);
      this.updateColorJSON();
    }
  }

  updateColorJSON(): void {
    const colorData = {
      StrokeColor: this.StrokeColor,
      BoxFillColor: this.BoxFillColor,
      CardFillColor: this.CardFillColor,
      CardNameColor: this.CardNameColor,
      BoxNumberColor: this.BoxNumberColor,
      CardNumberColor: this.CardNumberColor,
    };

    this.currentColorJSON = JSON.stringify(colorData, null, 2);
  }

  updateSerialColors(changedProperty?: string, changedValue?: string): void {
    if (!this.serial || !this.serial.id) {
      this.snackbar.error("No hay un serial seleccionado para actualizar");
      return;
    }

    const updateData: Serial = {
      serialName: this.serial.serialName,
      boxFillColor: this.BoxFillColor,
      boxNumberColor: this.BoxNumberColor,
      cardFillColor: this.CardFillColor,
      cardNameColor: this.CardNameColor,
      cardNumberColor: this.CardNumberColor,
      cardQuantity: this.serial.cardQuantity,
      creationDate: this.serial.creationDate,
      id: this.serial.id,
      strokeColor: this.StrokeColor
    };

    if (changedProperty && changedValue) {
      const tempUpdate: {[key: string]: any} = updateData;
      tempUpdate[changedProperty] = changedValue;

      Object.assign(updateData, tempUpdate);
    }

    this.serialService.updateSerial(updateData).subscribe({
      next: () => {
        if (this.serial && this.serial.id) {
          this.serialService.getSerialById(this.serial.id).subscribe({
            next: v => {
              this.serial = v;
              this.StrokeColor = v.strokeColor;
              this.BoxFillColor = v.boxFillColor;
              this.BoxNumberColor = v.boxNumberColor;
              this.CardFillColor = v.cardFillColor;
              this.CardNumberColor = v.cardNumberColor;
              this.CardNameColor = v.cardNameColor;
              this.serialService.serial.set(v);
              this.updateColorJSON();
            }
          });
        }
      },
      error: (err) => {
        this.snackbar.error("Error al actualizar los colores");
        console.error("Error actualizando colores:", err);
      }
    });
  }

  openColorPicker(element: string): void {
    this.isColorPickerOpen = true;
    this.selectElement(element, (this as any)[element]);
  }

  // Nuevas funciones para manejar la importación de JSON
  toggleJsonInput(): void {
    this.showJsonInput = !this.showJsonInput;
  }

  applyJsonColors(): void {
    try {
      const jsonTextarea = document.querySelector('.json-textarea') as HTMLTextAreaElement;
      if (!jsonTextarea || !jsonTextarea.value.trim()) {
        this.snackbar.error("Por favor ingresa un JSON válido");
        return;
      }

      const colorData = JSON.parse(jsonTextarea.value);

      // Verificación de la estructura del JSON
      const requiredKeys = ['StrokeColor', 'BoxFillColor', 'CardFillColor', 'CardNameColor', 'BoxNumberColor', 'CardNumberColor'];
      const missingKeys = requiredKeys.filter(key => !colorData.hasOwnProperty(key));

      if (missingKeys.length > 0) {
        this.snackbar.error(`JSON inválido. Faltan las siguientes propiedades: ${missingKeys.join(', ')}`);
        return;
      }

      // Validar que son valores de color hexadecimales
      const isValidHexColor = (color: string) => /^#([0-9A-F]{3}){1,2}$/i.test(color);
      const invalidColors = Object.entries(colorData)
        .filter(([key, value]) => requiredKeys.includes(key) && !isValidHexColor(value as string))
        .map(([key]) => key);

      if (invalidColors.length > 0) {
        this.snackbar.error(`Valores de color inválidos en: ${invalidColors.join(', ')}`);
        return;
      }

      // Aplicar los colores
      this.StrokeColor = colorData.StrokeColor;
      this.BoxFillColor = colorData.BoxFillColor;
      this.CardFillColor = colorData.CardFillColor;
      this.CardNameColor = colorData.CardNameColor;
      this.BoxNumberColor = colorData.BoxNumberColor;
      this.CardNumberColor = colorData.CardNumberColor;

      // Actualizar los colores en las opciones
      this.colorOptions.forEach(option => {
        const colorKey = option.value === 'strokeColor' ? 'StrokeColor' :
                        option.value === 'boxFillColor' ? 'BoxFillColor' :
                        option.value === 'cardFillColor' ? 'CardFillColor' :
                        option.value === 'cardNameColor' ? 'CardNameColor' :
                        option.value === 'boxNumberColor' ? 'BoxNumberColor' : 'CardNumberColor';

        option.currentColor = colorData[colorKey];
      });

      // Actualizar los colores en el serial
      this.updateSerialColors();
      this.updateColorJSON();

      // Cerrar el panel de importación
      this.showJsonInput = false;
      this.snackbar.success("Colores importados correctamente");

      // Resetear la paleta actual ya que estamos usando colores personalizados
      this.currentPalette = 'default';
    } catch (error) {
      this.snackbar.error("Error al importar colores. Verifica que el JSON sea válido");
      console.error('Error parsing JSON:', error);
    }
  }
}
