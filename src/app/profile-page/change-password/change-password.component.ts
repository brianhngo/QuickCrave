import { Component } from '@angular/core';
import { auth } from '../../firebase.config';
import { updatePassword } from 'firebase/auth';
import { changePassword } from '../../user-auth-form/auth.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { supabase } from '../../../../supabase.config';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  constructor(private router: Router) {}

  userPassword: changePassword = {
    currentPassword: '',
    newPassword1: '',
    newPassword2: '',
  };

  showPassword: boolean = false;
  showNewPassword1: boolean = false;
  showNewPassword2: boolean = false;

  ShowCurrentPassword() {
    this.showPassword = !this.showPassword;
  }

  ShowNewPassword1() {
    this.showNewPassword1 = !this.showNewPassword1;
  }

  ShowNewPassword2() {
    this.showNewPassword2 = !this.showNewPassword2;
  }

  passwordLengthRequirement: boolean = false;
  passwordUppercaseRequirement: boolean = false;
  passwordLowercaseRequirement: boolean = false;
  passwordSpecialCharRequirement: boolean = false;
  passwordNumberRequirement: boolean = false;
  passwordMeter: number = 0;

  // Doesnt meet password requirements
  errorMessage1: boolean = false;
  // New PW1 !== PW2
  errorMessage2: boolean = false;

  // the current PW typed is incorrect
  errorMessage3: boolean = false;

  // failed reaunthentication
  errorMessage4: boolean = false;

  successMessage1: boolean = false;

  resetCondition() {
    this.passwordLengthRequirement = false;
    this.passwordUppercaseRequirement = false;
    this.passwordLowercaseRequirement = false;
    this.passwordSpecialCharRequirement = false;
    this.passwordNumberRequirement = false;
    this.passwordMeter = 0;
    this.errorMessage1 = false;
    this.errorMessage2 = false;
    this.errorMessage3 = false;
    this.userPassword.currentPassword = '';
    this.userPassword.newPassword1 = '';
    this.userPassword.newPassword2 = '';
  }

  checkRequirements() {
    // Reset all requirements
    this.passwordLengthRequirement = false;
    this.passwordUppercaseRequirement = false;
    this.passwordLowercaseRequirement = false;
    this.passwordSpecialCharRequirement = false;
    this.passwordNumberRequirement = false;
    this.passwordMeter = 0;
    // Check length
    if (this.userPassword.newPassword1.length >= 6) {
      this.passwordLengthRequirement = true;
      this.passwordMeter++;
    }

    // Check for numbers
    if (/\d/.test(this.userPassword.newPassword1)) {
      this.passwordNumberRequirement = true;
      this.passwordMeter++;
    }

    // Check for lowercase letters
    if (/[a-z]/.test(this.userPassword.newPassword1)) {
      this.passwordLowercaseRequirement = true;
      this.passwordMeter++;
    }

    // Check for uppercase letters
    if (/[A-Z]/.test(this.userPassword.newPassword1)) {
      this.passwordUppercaseRequirement = true;
      this.passwordMeter++;
    }

    // Check for special characters
    if (/[^0-9a-zA-Z]/.test(this.userPassword.newPassword1)) {
      this.passwordSpecialCharRequirement = true;
      this.passwordMeter++;
    }
  }

  async changePasswordHandler(): Promise<void> {
    try {
      if (
        !this.passwordLengthRequirement ||
        !this.passwordUppercaseRequirement ||
        !this.passwordLowercaseRequirement ||
        !this.passwordNumberRequirement ||
        !this.passwordSpecialCharRequirement
      ) {
        this.resetCondition();
        this.errorMessage1 = true;
        return;
      }

      if (this.userPassword.newPassword1 !== this.userPassword.newPassword2) {
        this.resetCondition();
        this.errorMessage2 = true;
        return;
      }

      const user = auth.currentUser;

      if (!user || !user.email) {
        throw new Error('User email is missing or null');
      }

      const credential = EmailAuthProvider.credential(
        user.email,
        this.userPassword.currentPassword
      );

      try {
        await reauthenticateWithCredential(user, credential);
        // Reauthentication successful
      } catch (error) {
        // Reauthentication failed
        this.resetCondition();
        this.errorMessage4 = true;
        console.error('Error during reauthentication:', error);
      }

      const userId = user.uid;
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('firebaseId', userId)
        .single();

      if (error) {
        throw new Error('Error fetching user data');
      }

      if (data && data.password === this.userPassword.currentPassword) {
        // Update the password using Firebase's updatePassword method
        await updatePassword(user, this.userPassword.newPassword1);

        // Update the password in Supabase
        const { error: updateError } = await supabase
          .from('users')
          .update({ password: this.userPassword.newPassword1 })
          .eq('firebaseId', userId);

        if (updateError) {
          throw new Error('Error updating password in Supabase');
        }
        this.resetCondition();
        this.successMessage1 = true;
      } else {
        if (data.password !== this.userPassword) {
          this.resetCondition();
          this.errorMessage3 = true;
        }

        throw new Error(
          'Invalid current password or new passwords do not match'
        );
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  }
}
