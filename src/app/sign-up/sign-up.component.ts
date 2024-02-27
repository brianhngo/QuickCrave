import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { auth } from '../firebase.config';
import { newUser } from '../user-auth-form/auth.interface';
import { FormsModule } from '@angular/forms';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { supabase } from '../../../supabase.config';

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

  lengthRequirement: boolean = false;
  numberRequirement: boolean = false;
  lowerCaseRequirement: boolean = false;
  upperCaseRequirement: boolean = false;
  specialCharacterRequirement: boolean = false;
  errorMessagePassword: boolean = false;
  errorMessageUsername: boolean = false;
  passwordMeter: number = 0;

  checkRequirements(): void {
    // Reset all requirements
    this.lengthRequirement = false;
    this.numberRequirement = false;
    this.lowerCaseRequirement = false;
    this.upperCaseRequirement = false;
    this.specialCharacterRequirement = false;
    this.passwordMeter = 0;
    // Check length
    if (this.user.password.length >= 6) {
      this.lengthRequirement = true;
      this.passwordMeter++;
    }

    // Check for numbers
    if (/\d/.test(this.user.password)) {
      this.numberRequirement = true;
      this.passwordMeter++;
    }

    // Check for lowercase letters
    if (/[a-z]/.test(this.user.password)) {
      this.lowerCaseRequirement = true;
      this.passwordMeter++;
    }

    // Check for uppercase letters
    if (/[A-Z]/.test(this.user.password)) {
      this.upperCaseRequirement = true;
      this.passwordMeter++;
    }

    // Check for special characters
    if (/[^0-9a-zA-Z]/.test(this.user.password)) {
      this.specialCharacterRequirement = true;
      this.passwordMeter++;
    }
  }

  async resetForm(): Promise<void> {
    this.lengthRequirement = false;
    this.numberRequirement = false;
    this.lowerCaseRequirement = false;
    this.upperCaseRequirement = false;
    this.specialCharacterRequirement = false;
    this.errorMessagePassword = false;
    this.errorMessageUsername = false;
    this.user = { firstName: '', lastName: '', email: '', password: '' };
  }
  // Create New User Handler
  async createUserAuthHandler(): Promise<void> {
    try {
      if (
        !this.lengthRequirement ||
        !this.numberRequirement ||
        !this.lowerCaseRequirement ||
        !this.specialCharacterRequirement ||
        !this.upperCaseRequirement
      ) {
        this.errorMessageUsername = false;
        this.lengthRequirement = false;
        this.numberRequirement = false;
        this.lowerCaseRequirement = false;
        this.upperCaseRequirement = false;
        this.specialCharacterRequirement = false;
        this.user.password = '';
        this.passwordMeter = 0;
        this.errorMessagePassword = true;
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .select('email')
        .eq('email', this.user.email)
        .single();

      if (data && data.email) {
        this.errorMessagePassword = false;
        this.errorMessageUsername = true;
        this.user.email = '';
        this.user.password = '';
        this.lengthRequirement = false;
        this.numberRequirement = false;
        this.lowerCaseRequirement = false;
        this.upperCaseRequirement = false;
        this.passwordMeter = 0;
        this.specialCharacterRequirement = false;
        return;
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.user.email,
          this.user.password
        );
        // Signed up successfully
        const user = userCredential.user;

        if (user) {
          const { data, error } = await supabase.from('users').insert([
            {
              firebaseId: user.uid,
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              email: this.user.email,
              password: this.user.password,
            },
          ]);

          if (error) {
            throw error;
          }

          this.router.navigate(['/']);
          // reset the variables
          this.resetForm();
        }
      }
      // Additional actions if needed...
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  }
}
