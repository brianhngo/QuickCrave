import { Component } from '@angular/core';
import { auth } from '../../firebase.config';
import { updatePassword } from 'firebase/auth';
import { changePassword } from '../../user-auth-form/auth.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { supabase } from '../../../../supabase.config';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
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

  async changePasswordHandler(): Promise<void> {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User is not authenticated');
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

      if (
        data &&
        data.password === this.userPassword.currentPassword &&
        this.userPassword.newPassword1 === this.userPassword.newPassword2
      ) {
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
      } else {
        throw new Error(
          'Invalid current password or new passwords do not match'
        );
      }
    } catch (error) {
      console.error('Error changing password:', error);
    }
  }
}
