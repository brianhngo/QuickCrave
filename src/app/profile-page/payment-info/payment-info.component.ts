import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { userBillingInformation } from '../../user-auth-form/auth.interface';
import { supabase } from '../../../../supabase.config';
import { auth } from '../../firebase.config';
import { AddBillingModalComponent } from './add-billing-modal/add-billing-modal.component';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import { DeleteBillingModalComponent } from './delete-billing-modal/delete-billing-modal.component';
import { SetAsDefaultModalComponent } from './set-as-default-modal/set-as-default-modal.component';

@Component({
  selector: 'app-payment-info',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    AddBillingModalComponent,
    EditModalComponent,
    DeleteBillingModalComponent,
    SetAsDefaultModalComponent,
  ],
  templateUrl: './payment-info.component.html',
  styleUrl: './payment-info.component.css',
})
export class PaymentInfoComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  userBillingInfoList: userBillingInformation[] = [];

  getUserBillingList = async () => {
    try {
      let { data, error } = await supabase
        .from('billing')
        .select('*')
        .eq('firebaseId', auth.currentUser?.uid);
      if (data) {
        this.userBillingInfoList = data.map((item) => ({
          id: item.id,
          info: {
            Number: item.creditInfo.Number,
            Description: item.creditInfo.Description,
            FirstName: item.creditInfo.FirstName,
            LastName: item.creditInfo.LastName,
            cvc: item.creditInfo.cvc,
            ExpMonth: item.creditInfo.ExpMonth,
            ExpYear: item.creditInfo.ExpYear,
          },
          billing: {
            street: item.billingInfo.street,
            apartmentNumber: item.billingInfo.apartmentNumber,
            postalCode: item.billingInfo.postalCode,
            city: item.billingInfo.city,
            country: item.billingInfo.country,
          },
          isDefault: item.isDefault, // Assuming isDefault is retrieved from the database
        }));

        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error(error);
    }
  };

  ngOnInit() {
    try {
      this.getUserBillingList();
    } catch (error) {
      console.error(error);
    }
  }

  // Add Card Modal

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  onModalClosed() {
    this.isModalOpen = false;
  }

  // Edit Modal
  editId: string = '';

  setSelectedEditId(cardId: string) {
    this.editId = cardId;
  }

  isEditModal = false;

  openEditModal() {
    this.isEditModal = true;
  }

  onEditModalClosed() {
    this.isEditModal = false;
  }

  // Delete Card Modal

  isDeleteModal = false;
  isDeleteId: string = '';

  setSelectedDeleteId(cardId: string) {
    this.isDeleteId = cardId;
  }

  openDeleteModal() {
    this.isDeleteModal = true;
  }

  onDeleteModalClosed() {
    this.isDeleteModal = false;
  }

  // Set as Default Modal

  isSetDefaultModal = false;
  SetDefaultId: string = '';
  setDefaultModalId(cardId: string) {
    this.SetDefaultId = cardId;
  }

  openSetDefaultModal() {
    this.isSetDefaultModal = true;
  }

  setDefaultModalClosed() {
    this.isSetDefaultModal = false;
  }
}
