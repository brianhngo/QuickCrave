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
        if (data && data.length > 0) {
          const userData = data[0];

          this.userInfo.firstName = userData.firstName;
          this.userInfo.lastName = userData.lastName;
          this.userInfo.personalInfo.phoneNumber =
            userData.personalInfo?.phoneNumber ?? '';
          this.userInfo.personalInfo.street =
            userData.personalInfo?.street ?? '';
          this.userInfo.personalInfo.apartmentNumber =
            userData.personalInfo?.apartmentNumber ?? '';
          this.userInfo.personalInfo.postalCode =
            userData.personalInfo?.postalCode ?? '';
          this.userInfo.personalInfo.city = userData.personalInfo?.city ?? '';
          this.userInfo.personalInfo.country =
            userData.personalInfo?.country ?? '';
          this.email = userData.email;
        } else {
          console.log('User data not found.');
        }
      } else {
        console.log('User is not authenticated.');
      }
      unsubscribe();
    });
  }
}
