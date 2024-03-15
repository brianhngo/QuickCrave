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

  errorCardNumber: boolean = false;
  errorCardDescription: boolean = false;
  errorCardFirstName: boolean = false;
  errorCardLastName: boolean = false;
  errorCardCVC: boolean = false;
  errorCardExpMonth: boolean = false;
  errorCardExpYear: boolean = false;
  errorCardStreet: boolean = false;
  errorCardPostal: boolean = false;
  errorCardCity: boolean = false;
  errorCardCountry: boolean = false;

  resetErrorMessage() {
    this.errorCardNumber = false;
    this.errorCardDescription = false;
    this.errorCardFirstName = false;
    this.errorCardLastName = false;
    this.errorCardCVC = false;
    this.errorCardExpMonth = false;
    this.errorCardExpYear = false;
    this.errorCardStreet = false;
    this.errorCardPostal = false;
    this.errorCardCity = false;
    this.errorCardCountry = false;
  }

  checkRequirement2(): boolean {
    if (
      this.userBillingInfo.info.Number.length < 12 ||
      this.userBillingInfo.info.Number.length > 19
    ) {
      this.resetErrorMessage();
      this.errorCardNumber = true;
      return false;
    }

    if (this.userBillingInfo.info.Description.length < 1) {
      this.resetErrorMessage();
      this.errorCardDescription = true;
      return false;
    }

    if (this.userBillingInfo.info.FirstName.length < 1) {
      this.resetErrorMessage();
      this.errorCardFirstName = true;
      return false;
    }

    if (this.userBillingInfo.info.LastName.length < 1) {
      this.resetErrorMessage();
      this.errorCardLastName = true;
      return false;
    }

    if (
      this.userBillingInfo.info.cvc.length < 3 ||
      this.userBillingInfo.info.cvc.length > 3
    ) {
      this.resetErrorMessage();
      this.errorCardCVC = true;
      return false;
    }

    if (this.userBillingInfo.info.ExpMonth.length !== 2) {
      this.resetErrorMessage();
      this.errorCardExpMonth = true;
      return false;
    }
    if (this.userBillingInfo.info.ExpYear.length !== 4) {
      this.resetErrorMessage();
      this.errorCardExpYear = true;
      return false;
    }

    if (this.userBillingInfo.billing.street.length < 1) {
      this.resetErrorMessage();
      this.errorCardStreet = true;
      return false;
    }

    if (this.userBillingInfo.billing.postalCode.length < 1) {
      this.resetErrorMessage();
      this.errorCardPostal = true;
      return false;
    }

    if (this.userBillingInfo.billing.city.length < 1) {
      this.resetErrorMessage();
      this.errorCardCity = true;
      return false;
    }

    if (this.userBillingInfo.billing.country.length < 1) {
      this.resetErrorMessage();
      this.errorCardCountry = true;
      return false;
    }
    return true;
  }

  closeModal() {
    this.resetForum();

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
      if (!this.checkRequirement2()) {
        this.resetForum();
        return;
      }
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
