import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { auth } from '../firebase.config';
import { newUser } from '../user-auth-form/auth.interface';
import { FormsModule } from '@angular/forms';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers: [AuthService],
})
export class SignUpComponent {
  constructor(public AuthService: AuthService, private router: Router) {}

  user: newUser = { firstName: '', lastName: '', email: '', password: '' };

  async createUserAuthHandler(): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        this.user.email,
        this.user.password
      );
      // Signed up successfully
      const user = userCredential.user;

      if (user) {
        this.router.navigate(['/']);
      }
      // Additional actions if needed...
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  }
}
