import { Component } from '@angular/core';
import { LoginPageComponent } from '../login-page/login-page.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-auth-form',
  standalone: true,
  imports: [
    LoginPageComponent,
    SignUpComponent,
    CommonModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ],
  providers: [AuthService],
  templateUrl: './user-auth-form.component.html',
  styleUrl: './user-auth-form.component.css',
})
export class UserAuthFormComponent {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Check if showSignIn is not set, then set it to 'signin'
    if (this.authService.showSignIn === 'signup') {
      this.authService.showSignIn = 'signup';
    }
  }
}
