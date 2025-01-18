import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  imports: [],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss'
})
export class ColorPickerComponent {

  @Input() heading: string = 'Color Picker';
  @Input() color: string = '#000105';
  @Output() colorChange = new EventEmitter<string>();

  public show = false;
  public selectedColor: string = '#000105';
  public defaultColors: string[] = [
    '#ffffff', '#000105', '#3e6158', '#3f7a89', '#96c582',
    '#b7d5c4', '#bcd6e7', '#7c90c1', '#9d8594', '#dad0d8',
    '#4b4fce', '#4e0a77', '#a367b5', '#ee3e6d', '#d63d62',
    '#c6a670', '#f46600', '#cf0500', '#efabbd', '#8e0622',
    '#f0b89a', '#f0ca68', '#62382f', '#c97545', '#c1800b'
  ];

  ngOnInit() {
    this.selectedColor = this.color || '#000105';
  }

  public toggleColors() {
    this.show = !this.show;
  }

  public selectColor(color: string) {
    this.selectedColor = color;
    this.color = color;
    this.colorChange.emit(color);
    this.show = false;
  }

  public onHexChange(event: any) {
    const newColor = event.target.value;
    if (this.isValidHex(newColor)) {
      this.selectColor(newColor);
    }
  }

  private isValidHex(color: string): boolean {
    return /^#[0-9A-Fa-f]{6}$/.test(color);
  }
}
