import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';

export interface DropdownOption {
  value: string;
  label: string;
  imageUrl?: string;
  isCustom?: boolean;
}

@Component({
  selector: 'app-generic-dropdown',
  imports: [MatIcon, MatFormField, MatLabel, MatSelect, MatOption, ReactiveFormsModule],  templateUrl: './generic-dropdown.component.html',
  styleUrl: './generic-dropdown.component.scss'
})
export class GenericDropdownComponent {
  @Input() label = '';
  @Input() options: DropdownOption[] = [];
  @Input() defaultValue = '';
  @Output() selectedValueChange = new EventEmitter<string>();
  @Output() optionRemoved = new EventEmitter<string>();

  control = new FormControl('');

  ngOnInit() {
    this.control.setValue(this.defaultValue);
    this.control.valueChanges.subscribe(value => {
      if (value) this.selectedValueChange.emit(value);
    });
  }

  removeOption(value: string) {
    this.optionRemoved.emit(value);
  }
}

