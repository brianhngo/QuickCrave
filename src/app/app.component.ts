// app.component.ts
import { Component } from '@angular/core';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './landingpage/navigation-bar/navigation-bar.component';
import { UserAuthFormComponent } from './user-auth-form/user-auth-form.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    NavigationBarComponent,
    LandingpageComponent,
    LoginPageComponent,
    FormsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    UserAuthFormComponent,
  ],
})
export class AppComponent {
  title = 'QuickCrave';
}
