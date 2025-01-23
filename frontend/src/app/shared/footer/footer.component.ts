import { Component } from '@angular/core';
import { TextButtonComponent } from '../buttons/text-button/text-button.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Footer1DialogComponent } from '../dialogs/footer-1-dialog/footer-1-dialog.component';
import { Footer2DialogComponent } from '../dialogs/footer-2-dialog/footer-2-dialog.component';

@Component({
  selector: 'app-footer',
  imports: [TextButtonComponent,
    MatDialogModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private dialog: MatDialog) {}

  openAboutUsDialog(): void {
    this.dialog.open(Footer1DialogComponent, {
      width: '500px'
    });
  }

  openContactDialog(): void {
    this.dialog.open(Footer2DialogComponent, {
      width: '500px'
    });
  }
}
