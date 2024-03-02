import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { userBillingInformation } from '../../user-auth-form/auth.interface';
import { supabase } from '../../../../supabase.config';
import { auth } from '../../firebase.config';
import { AddBillingModalComponent } from './add-billing-modal/add-billing-modal.component';

@Component({
  selector: 'app-payment-info',
  standalone: true,
  imports: [FormsModule, CommonModule, AddBillingModalComponent],
  templateUrl: './payment-info.component.html',
  styleUrl: './payment-info.component.css',
})
export class PaymentInfoComponent implements OnInit {
  userBillingInfoList: userBillingInformation[] = [];
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

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  onModalClosed() {
    this.isModalOpen = false;
  }
}
