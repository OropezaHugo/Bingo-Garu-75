import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-add-frame',
  imports: [MatIcon],
  templateUrl: './add-frame.component.html',
  styleUrl: './add-frame.component.scss'
})
export class AddFrameComponent {
  @Input() label = 'Upload File';
  @Output() fileSelected = new EventEmitter<{ file: File, dataUrl: string }>();

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (!file.type.startsWith('image/')) {
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        this.fileSelected.emit({ file, dataUrl });
      };
      reader.readAsDataURL(file);
    }
  }
}
