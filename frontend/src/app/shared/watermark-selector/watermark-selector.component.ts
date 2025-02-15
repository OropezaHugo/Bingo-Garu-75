import { Component, EventEmitter, Output } from '@angular/core';
import { SnackbarService } from '../../core/services/snackbar.service';
import { AddFrameComponent } from '../add-frame/add-frame.component';
import { DropdownOption, GenericDropdownComponent } from '../generic-dropdown/generic-dropdown.component';

interface WatermarkOption {
  value: string;
  label: string;
  imageUrl?: string;
  isCustom?: boolean;
}

@Component({
  selector: 'app-watermark-selector',
  imports: [GenericDropdownComponent, AddFrameComponent],
  templateUrl: './watermark-selector.component.html',
  styleUrl: './watermark-selector.component.scss'
})
export class WatermarkSelectorComponent {
  @Output() watermarkUrlChange = new EventEmitter<string>();

  watermarkOptions: DropdownOption[] = [
    { value: 'none',  label: 'Sin Watermark', imageUrl: 'translucent.png'},
    { value: 'default', label: 'Logo Por Defecto', imageUrl: 'Logo.png' },
    { value: 'secondary', label: 'Logo 2 el regreso', imageUrl: 'Logo2.png'}
  ];

  customWatermarks: DropdownOption[] = [];

  constructor(private snackBar: SnackbarService) {}

  onWatermarkChange(value: string) {
    const selectedWatermark = this.watermarkOptions.find(w => w.value === value);
    this.watermarkUrlChange.emit(selectedWatermark?.imageUrl || 'Logo.png');
  }

  onWatermarkUploaded(event: { file: File, dataUrl: string }) {
    const watermarkLabel = event.file.name.split('.')[0];
    const newWatermark: DropdownOption = {
      value: `custom-${Date.now()}`,
      label: `Marca de agua: ${watermarkLabel}`,
      imageUrl: event.dataUrl,
      isCustom: true
    };

    this.customWatermarks.push(newWatermark);
    this.watermarkOptions = [
      ...this.watermarkOptions.filter(w => !w.isCustom),
      ...this.customWatermarks
    ];
    this.snackBar.success('Marca de agua cargada exitosamente');
  }

  removeCustomWatermark(watermarkValue: string) {
    this.customWatermarks = this.customWatermarks.filter(w => w.value !== watermarkValue);
    this.watermarkOptions = [
      ...this.watermarkOptions.filter(w => !w.isCustom),
      ...this.customWatermarks
    ];
  }
}
