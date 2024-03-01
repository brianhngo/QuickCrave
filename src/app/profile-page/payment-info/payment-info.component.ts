import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { userBillingInformation } from '../../user-auth-form/auth.interface';
import { supabase } from '../../../../supabase.config';
import { auth } from '../../firebase.config';

@Component({
  selector: 'app-payment-info',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './payment-info.component.html',
  styleUrl: './payment-info.component.css',
})
export class PaymentInfoComponent implements OnInit {
  userBillingInfoList: userBillingInformation[] = [];
  userBillingInfo: userBillingInformation = {
    card: {
      // per card. As a user can have many cards saved in the App
      info: {
        Number: '',
        Description: '',
        FirstName: '',
        LastName: '',
        cvc: '',
        ExpMonth: '',
        ExpYear: '',
      },
      billing: {
        street: '',
        apartmentNumber: '',
        postalCode: '',
        city: '',
        country: '',
      },
    },
  };

  async addCardDate() {
    try {
      let { data, error } = await supabase
        .from('users')
        .select('billingInfo')
        .eq('firebaseId', auth.currentUser?.uid);

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        const userData = data[0]; // Access the first (and presumably only) row
        if (userData.billingInfo === null) {
          // If billingInfo is null, initialize it with an array containing userBillingInfo
          userData.billingInfo = [this.userBillingInfo];
        } else {
          // Otherwise, push userBillingInfo into the existing billingInfo array
          userData.billingInfo.push(this.userBillingInfo);
        }

        // Update the billingInfo field of the specific row with the modified data
        await supabase
          .from('users')
          .update({ billingInfo: userData.billingInfo })
          .eq('firebaseId', auth.currentUser?.uid)
          .then(() => {
            this.getUserBillingList();
          });
      } else {
        console.log('No user data found');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getUserBillingList() {
    try {
      let { data, error } = await supabase
        .from('users')
        .select('billingInfo')
        .eq('firebaseId', auth.currentUser?.uid);
      if (data) {
        const userData = data[0];
        this.userBillingInfoList = userData.billingInfo;
      }
    } catch (error) {
      console.error(error);
    }
  }

  ngOnInit() {
    try {
      this.getUserBillingList();
    } catch (error) {
      console.error(error);
    }
  }
}
