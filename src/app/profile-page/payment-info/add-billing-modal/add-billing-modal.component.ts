import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { userBillingInformation } from '../../../user-auth-form/auth.interface';
import { supabase } from '../../../../../supabase.config';
import { auth } from '../../../firebase.config';
@Component({
  selector: 'app-add-billing-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-billing-modal.component.html',
  styleUrl: './add-billing-modal.component.css',
})
export class AddBillingModalComponent {
  @Input() isOpen = false; // Input to control modal state
  @Input() getUserBillingList!: () => void;
  @Output() closed = new EventEmitter<void>();

  closeModal() {
    this.isOpen = false;
    this.closed.emit();
  }

  isDefaultStatus: boolean = false;

  defaultHandler() {
    this.isDefaultStatus = !this.isDefaultStatus;
  }

  userBillingInfo: userBillingInformation = {
    id: '',
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
    isDefault: false,
  };

  //reset the forms back to original state
  resetForum() {
    this.userBillingInfo = {
      id: '',
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
      isDefault: false,
    };
    this.isDefaultStatus = false;
  }

  async addCardDate() {
    try {
      // Update the billingInfo field of the specific row with the modified data
      if (!this.isDefaultStatus) {
        // new set as default
        await supabase
          .from('billing')
          .insert({
            firebaseId: auth.currentUser?.uid,
            billingInfo: this.userBillingInfo.billing,
            creditInfo: this.userBillingInfo.info,
            isDefault: this.isDefaultStatus,
          })
          .eq('firebaseId', auth.currentUser?.uid)
          .then(() => {
            this.getUserBillingList();
            this.resetForum();
            this.closeModal();
          });
      } else {
        // is not set as default, but card is added

        await supabase
          .from('billing')
          .update({
            isDefault: false,
          })
          .eq('firebaseId', auth.currentUser?.uid)
          .eq('isDefault', true);

        await supabase
          .from('billing')
          .insert({
            firebaseId: auth.currentUser?.uid,
            billingInfo: this.userBillingInfo.billing,
            creditInfo: this.userBillingInfo.info,
            isDefault: this.isDefaultStatus,
          })
          .eq('firebaseId', auth.currentUser?.uid)
          .then(() => {
            this.getUserBillingList();
            this.resetForum();
            this.closeModal();
          });
      }
    } catch (error) {
      console.error(error);
    }
  }
}
