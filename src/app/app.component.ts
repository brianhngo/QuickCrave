// app.component.ts
import { Component } from '@angular/core';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    LandingpageComponent,
    LoginPageComponent,
    CommonModule,
    RouterOutlet,
    RouterLink,
  ],
})
export class AppComponent {
  title = 'QuickCrave';
}
