import { Component, OnInit } from '@angular/core';
import { auth } from '../../firebase.config';
import { supabase } from '../../../../supabase.config';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { userPersonalInformation } from '../../user-auth-form/auth.interface';
import { onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css',
})
export class PersonalInfoComponent implements OnInit {
  successMessage: boolean = false;
  errorMessage: boolean = false;

  resetStates() {
    this.successMessage = false;
    this.errorMessage = false;
  }

  userInfo: userPersonalInformation = {
    firstName: '',
    lastName: '',
    personalInfo: {
      phoneNumber: '',
      street: '',
      apartmentNumber: '',
      postalCode: '',
      city: '',
      country: '',
    },
  };

  email: string = '';

  async updateUserInformation() {
    try {
      if (!auth.currentUser) {
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .update({
          firstName: this.userInfo.firstName,
          lastName: this.userInfo.lastName,
          personalInfo: this.userInfo.personalInfo,
        })
        .eq('firebaseId', auth.currentUser.uid);

      if (error) {
        this.resetStates();
        this.errorMessage = true;
      } else {
        this.successMessage = true;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async ngOnInit(): Promise<void> {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { data, error } = await supabase
          .from('users')
          .select('firstName, lastName, personalInfo, email')
          .eq('firebaseId', user.uid);
        if (data) {
          this.userInfo.firstName = data[0].firstName;
          this.userInfo.lastName = data[0].lastName;
          this.userInfo.personalInfo = data[0].personalInfo;
          this.email = data[0].email;
        }
      } else {
        console.log('User is not authenticated.');
      }
      unsubscribe(); // Unsubscribe to avoid memory leaks
    });
  }
}
