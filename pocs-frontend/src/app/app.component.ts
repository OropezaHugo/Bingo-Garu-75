import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from '@angular/material/stepper';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButton, MatFormField, MatInput, MatLabel, MatStepper, MatStep, MatStepLabel, MatStepperNext, MatStepperPrevious],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('rotate', [
      state('normal', style({
        transform: 'rotate(0deg)'
      })),
      state('rotated', style({
        transform: 'rotate(3600deg)'
      })),
      transition('normal <=> rotated', animate('3000ms ease-in-out'))
    ])
  ]
})
export class AppComponent {
  title = 'pocs-frontend';
  rotationState: 'normal' | 'rotated' = 'normal';
  rotate() {
    this.rotationState = this.rotationState === 'normal' ? 'rotated' : 'normal';
  }
}
