import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { userBillingInformation } from '../../../user-auth-form/auth.interface';
import { supabase } from '../../../../../supabase.config';
import { auth } from '../../../firebase.config';

@Component({
  selector: 'app-edit-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-modal.component.html',
  styleUrl: './edit-modal.component.css',
})
export class EditModalComponent implements OnChanges {
  @Input() isEditOpen = false;
  @Input() getUserBillingList!: () => void;
  @Output() closed = new EventEmitter<void>();
  @Input() editId: string = '';

  // indicator that one of the inputs was left blank
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

  closeEditModal() {
    if (this.formDirty) {
      // User makes changes and decides to exit modal. Reset to default value
      this.resetInputValues();
    } else {
      // user hits saves changes, now i need to update the inputs with the new value
    }
    this.resetErrorMessage();
    this.isEditOpen = false;
    this.closed.emit();
  }

  formDirty: boolean = false;
  defaultInputCopy: any = null;
  isDefaultStatus: boolean = false;

  onFormFieldChange(): void {
    // Set form dirty state to true
    this.formDirty = true;
  }

  defaultHandler() {
    this.isDefaultStatus = !this.isDefaultStatus;
  }

  resetInputValues() {
    // reset back to the default
    if (this.defaultInputCopy) {
      this.userBillingInfo = {
        id: this.defaultInputCopy.id,
        info: {
          Number: this.defaultInputCopy.creditInfo.Number,
          Description: this.defaultInputCopy.creditInfo.Description,
          FirstName: this.defaultInputCopy.creditInfo.FirstName,
          LastName: this.defaultInputCopy.creditInfo.LastName,
          cvc: this.defaultInputCopy.creditInfo.cvc,
          ExpMonth: this.defaultInputCopy.creditInfo.ExpMonth,
          ExpYear: this.defaultInputCopy.creditInfo.ExpYear,
        },
        billing: {
          street: this.defaultInputCopy.billingInfo.street,
          apartmentNumber: this.defaultInputCopy.billingInfo.apartmentNumber,
          postalCode: this.defaultInputCopy.billingInfo.postalCode,
          city: this.defaultInputCopy.billingInfo.city,
          country: this.defaultInputCopy.billingInfo.country,
        },
        isDefault: this.isDefaultStatus,
      };
      this.isDefaultStatus = false;
    }
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

  async editCardDate() {
    try {
      if (!this.checkRequirement2()) {
        this.resetInputValues();
        return;
      }

      if (!this.isDefaultStatus) {
        // Update the specific row in the billing table
        await supabase
          .from('billing')
          .update({
            billingInfo: this.userBillingInfo.billing,
            creditInfo: this.userBillingInfo.info, // Changed 'info' to 'creditInfo' assuming it's the correct column name
          })
          .eq('id', this.userBillingInfo.id) // Filter by the ID of the row to update
          .then(() => {
            this.formDirty = false;
            this.getUserBillingList();
            this.closeEditModal();
          });
      } else {
        await supabase
          .from('billing')
          .update({
            isDefault: false,
          })
          .eq('firebaseId', auth.currentUser?.uid)
          .eq('isDefault', true);

        await supabase
          .from('billing')
          .update({
            firebaseId: auth.currentUser?.uid,
            billingInfo: this.userBillingInfo.billing,
            creditInfo: this.userBillingInfo.info,
            isDefault: this.isDefaultStatus,
          })
          .eq('firebaseId', auth.currentUser?.uid)
          .eq('id', this.userBillingInfo.id)
          .then(() => {
            this.formDirty = false;
            this.getUserBillingList();

            this.closeEditModal();
          });
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Getting a particular card Info To Edit
  getCardInfo = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('billing')
        .select('*')
        .eq('firebaseId', auth.currentUser?.uid)
        .eq('id', id.toString());

      if (data) {
        this.userBillingInfo = {
          id: data[0].id,
          info: {
            Number: data[0].creditInfo.Number,
            Description: data[0].creditInfo.Description,
            FirstName: data[0].creditInfo.FirstName,
            LastName: data[0].creditInfo.LastName,
            cvc: data[0].creditInfo.cvc,
            ExpMonth: data[0].creditInfo.ExpMonth,
            ExpYear: data[0].creditInfo.ExpYear,
          },
          billing: {
            street: data[0].billingInfo.street,
            apartmentNumber: data[0].billingInfo.apartmentNumber,
            postalCode: data[0].billingInfo.postalCode,
            city: data[0].billingInfo.city,
            country: data[0].billingInfo.country,
          },
          isDefault: data[0].isDefault,
        };

        this.isDefaultStatus = data[0].isDefault;
        this.defaultInputCopy = data[0];
      }
    } catch (error) {
      console.error(error);
    }
  };

  ngOnChanges(changes: any): void {
    if (changes.editId && changes.editId.currentValue) {
      this.getCardInfo(changes.editId.currentValue);
    }
  }
}
