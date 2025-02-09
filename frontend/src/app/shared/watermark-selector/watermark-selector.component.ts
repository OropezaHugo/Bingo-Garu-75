import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SnackbarService } from '../../core/services/snackbar.service';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

interface WatermarkOption {
  value: string;
  label: string;
  imageUrl?: string;
  isCustom?: boolean;
}

@Component({
  selector: 'app-watermark-selector',
  imports: [MatIcon, MatFormField, MatLabel, MatSelect, MatOption, ReactiveFormsModule],
  templateUrl: './watermark-selector.component.html',
  styleUrl: './watermark-selector.component.scss'
})
export class WatermarkSelectorComponent {
  @Output() watermarkUrlChange = new EventEmitter<string>();

  watermarkOptions: WatermarkOption[] = [
    { value: 'default', label: 'Logo Por Defecto', imageUrl: 'Logo.png' }
  ];

  customWatermarks: WatermarkOption[] = [];
  watermarkForm = new FormControl<string>('default');

  constructor(private snackBar: SnackbarService) {
    this.watermarkForm.valueChanges.subscribe(() => {
      this.emitWatermarkUrl();
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (!file.type.startsWith('image/')) {
        this.snackBar.error('Por favor seleccione un archivo de imagen válido');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const watermarkLabel = file.name.split('.')[0];

        const newWatermark: WatermarkOption = {
          value: `custom-${Date.now()}`,
          label: `Marca de agua: ${watermarkLabel}`,
          imageUrl: imageUrl,
          isCustom: true
        };

        this.customWatermarks.push(newWatermark);
        this.watermarkOptions = [
          ...this.watermarkOptions.filter(w => !w.isCustom),
          ...this.customWatermarks
        ];

        this.watermarkForm.setValue(newWatermark.value);
        this.snackBar.success('Marca de agua cargada exitosamente');
      };
      reader.readAsDataURL(file);
    }
  }

  removeCustomWatermark(watermarkValue: string): void {
    this.customWatermarks = this.customWatermarks.filter(w => w.value !== watermarkValue);
    this.watermarkOptions = [
      ...this.watermarkOptions.filter(w => !w.isCustom),
      ...this.customWatermarks
    ];

    if (this.watermarkForm.value === watermarkValue) {
      this.watermarkForm.setValue('default');
    }
  }

  private emitWatermarkUrl(): void {
    const selectedWatermark = this.watermarkOptions.find(w => w.value === this.watermarkForm.value);
    this.watermarkUrlChange.emit(selectedWatermark?.imageUrl || 'Logo.png');
  }
}
