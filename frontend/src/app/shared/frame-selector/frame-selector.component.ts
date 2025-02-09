import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SnackbarService } from '../../core/services/snackbar.service';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

interface FrameOption {
  value: string;
  label: string;
  imageUrl?: string;
  isCustom?: boolean;
}


@Component({
  selector: 'app-frame-selector',
  imports: [MatIcon, MatFormField, MatLabel, MatSelect, MatOption, ReactiveFormsModule],
  templateUrl: './frame-selector.component.html',
  styleUrl: './frame-selector.component.scss'
})
export class FrameSelectorComponent {
  @Output() frameUrlChange = new EventEmitter<string | null>();

  frameOptions: FrameOption[] = [
    { value: 'none', label: 'Sin Marco' },
    { value: 'halloween', label: 'Halloween', imageUrl: 'Halloween.png' },
    { value: 'christmas', label: 'Navidad', imageUrl: 'Navidad.png' }
  ];

  frameTypeForm = new FormControl<string>('none');
  customFrames: FrameOption[] = [];

  constructor(private snackBar: SnackbarService) {
    this.frameTypeForm.valueChanges.subscribe(() => {
      this.emitFrameUrl();
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
        const frameLabel = file.name.split('.')[0];

        const newFrame: FrameOption = {
          value: `custom-${Date.now()}`,
          label: `Marco: ${frameLabel}`,
          imageUrl: imageUrl,
          isCustom: true
        };

        this.customFrames.push(newFrame);
        this.frameOptions = [
          ...this.frameOptions.filter(f => !f.isCustom),
          ...this.customFrames
        ];

        this.frameTypeForm.setValue(newFrame.value);
        this.snackBar.success('Marco cargado exitosamente');
      };
      reader.readAsDataURL(file);
    }
  }

  removeCustomFrame(frameValue: string): void {
    this.customFrames = this.customFrames.filter(f => f.value !== frameValue);
    this.frameOptions = [
      ...this.frameOptions.filter(f => !f.isCustom),
      ...this.customFrames
    ];

    if (this.frameTypeForm.value === frameValue) {
      this.frameTypeForm.setValue('none');
    }
  }

  private emitFrameUrl(): void {
    const selectedFrame = this.frameOptions.find(f => f.value === this.frameTypeForm.value);
    this.frameUrlChange.emit(selectedFrame?.imageUrl || null);
  }
}
