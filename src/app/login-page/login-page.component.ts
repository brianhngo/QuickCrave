import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebase.config';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserAuth } from '../user-auth-form/auth.interface';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  providers: [AuthService],
})
export class LoginPageComponent {
  constructor(public AuthService: AuthService, private router: Router) {}

  user: UserAuth = {
    username: '',
    password: '',
  };

  async handleUserAuth(): Promise<void> {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        this.user.username,
        this.user.password
      );

      const userId = userCredential.user;

      if (userId) {
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async handleGoogleLogin(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);

      // If login is successful, navigate to '/'
      this.router.navigate(['/']);
    } catch (error) {
      console.error(error);
    }
  }
}
