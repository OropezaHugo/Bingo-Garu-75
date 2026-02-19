import {Component, inject, OnInit} from '@angular/core';
import { TextButtonComponent } from '../buttons/text-button/text-button.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Footer1DialogComponent } from '../dialogs/footer-1-dialog/footer-1-dialog.component';
import { Footer2DialogComponent } from '../dialogs/footer-2-dialog/footer-2-dialog.component';
import {Router} from '@angular/router';
import {AccountService} from '../../core/services/account.service';
import {LoginComponent} from '../../pages/login/login.component';
import {GoogleUserInfo} from '../../core/models/user';

@Component({
  selector: 'app-footer',
  imports: [TextButtonComponent,
    MatDialogModule, LoginComponent
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  router = inject(Router)
  accountService = inject(AccountService)
  tokenData: GoogleUserInfo | undefined = undefined;
  ngOnInit() {
    this.tokenData = this.accountService.getTokenData()
  }

  loginWithGoogle() {
    window.location.href = 'http://localhost:5075/api/auth/login'; // Backend de .NET
  }

  logout() {
    this.accountService.logout()
  }

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
