import { Component } from '@angular/core';
import { auth } from '../../firebase.config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { forgetPassword } from '../../user-auth-form/auth.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent {
  constructor(private router: Router) {}

  userEmail: forgetPassword = {
    email: '',
  };

  async sendEmailConfirmation(email: string) {
    try {
      await sendPasswordResetEmail(auth, email).then(() => {});
      this.router.navigate(['/forgetPasswordConfirmation']);
    } catch (error) {
      console.error(error);
    }
  }
}
