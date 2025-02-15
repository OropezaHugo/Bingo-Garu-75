import { Component, EventEmitter, Output } from '@angular/core';
import { SnackbarService } from '../../core/services/snackbar.service';
import { AddFrameComponent } from '../add-frame/add-frame.component';
import { DropdownOption, GenericDropdownComponent } from '../generic-dropdown/generic-dropdown.component';


@Component({
  selector: 'app-frame-selector',
  imports: [GenericDropdownComponent, AddFrameComponent],
  templateUrl: './frame-selector.component.html',
  styleUrl: './frame-selector.component.scss'
})
export class FrameSelectorComponent {
  @Output() frameUrlChange = new EventEmitter<string | null>();

  frameOptions: DropdownOption[] = [
    { value: 'none', label: 'Sin Marco' },
    { value: 'halloween', label: 'Halloween', imageUrl: 'Halloween.png' },
    { value: 'christmas', label: 'Navidad', imageUrl: 'Navidad.png' }
  ];

  customFrames: DropdownOption[] = [];

  constructor(private snackBar: SnackbarService) {}

  onFrameChange(value: string) {
    const selectedFrame = this.frameOptions.find(f => f.value === value);
    this.frameUrlChange.emit(selectedFrame?.imageUrl || null);
  }

  onFrameUploaded(event: { file: File, dataUrl: string }) {
    const frameLabel = event.file.name.split('.')[0];
    const newFrame: DropdownOption = {
      value: `custom-${Date.now()}`,
      label: `Marco: ${frameLabel}`,
      imageUrl: event.dataUrl,
      isCustom: true
    };

    this.customFrames.push(newFrame);
    this.frameOptions = [
      ...this.frameOptions.filter(f => !f.isCustom),
      ...this.customFrames
    ];
    this.snackBar.success('Marco cargado exitosamente');
  }

  removeCustomFrame(frameValue: string) {
    this.customFrames = this.customFrames.filter(f => f.value !== frameValue);
    this.frameOptions = [
      ...this.frameOptions.filter(f => !f.isCustom),
      ...this.customFrames
    ];
  }
}
