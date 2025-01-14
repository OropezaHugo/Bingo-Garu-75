import { Component, OnInit } from '@angular/core';
import { TextButtonComponent } from '../buttons/text-button/text-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    TextButtonComponent,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  isMobile = false;
  isDrawerOpen = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe(result => {
        this.isMobile = result.matches;
        if (!this.isMobile) {
          this.isDrawerOpen = false;
        }
      });
  }

  toggleDrawer() {
    if (this.isMobile) {
      this.isDrawerOpen = !this.isDrawerOpen;
    }
  }

  shouldShowNavLinks(): boolean {
    return !this.isMobile;
  }
}
