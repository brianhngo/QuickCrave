import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AddCarModalComponent } from './add-car-modal/add-car-modal.component';
import { DeleteCarModalComponent } from './delete-car-modal/delete-car-modal.component';
import { EditCarModalComponent } from './edit-car-modal/edit-car-modal.component';
import { SetCarAsDefaultModalComponent } from './set-car-as-default-modal/set-car-as-default-modal.component';
import { supabase } from '../../../../supabase.config';
import { auth } from '../../firebase.config';
import { addCarInformation } from '../../user-auth-form/auth.interface';
import { CommonModule } from '@angular/common';
import { AddDriverLicenseComponent } from './add-driver-license/add-driver-license.component';
import { EditDriverLicenseComponent } from './edit-driver-license/edit-driver-license.component';
@Component({
  selector: 'app-driver-profile',
  standalone: true,
  imports: [
    AddCarModalComponent,
    DeleteCarModalComponent,
    EditCarModalComponent,
    SetCarAsDefaultModalComponent,
    AddDriverLicenseComponent,
    EditDriverLicenseComponent,
    CommonModule,
  ],
  templateUrl: './driver-profile.component.html',
  styleUrl: './driver-profile.component.css',
})
export class DriverProfileComponent implements OnInit {
  // Add Car Modal
  constructor(private cdr: ChangeDetectorRef) {}
  isAddCarModal: boolean = false;

  userCarList: addCarInformation[] = [];

  getCarList = async () => {
    try {
      const { data, error } = await supabase
        .from('driver')
        .select('*')
        .eq('firebaseId', auth.currentUser?.uid);
      if (data) {
        this.userCarList = data.map((item) => ({
          id: item.carId,
          carInfo: {
            state: item.carInfo.state,
            carType: item.carInfo.carType,
            licensePlate: item.carInfo.licensePlate,
            carBrand: item.carInfo.carBrand,
            carModel: item.carInfo.carModel,
            carColor: item.carInfo.carColor,
            carYear: item.carInfo.carYear,
          },
          isDefault: item.isDefault,
        }));
      }

      this.cdr.detectChanges();
    } catch (error) {
      console.log(error);
    }
  };

  openAddCarModal() {
    this.isAddCarModal = true;
  }

  closeAddCarModal() {
    this.isAddCarModal = false;
  }

  // Edit Modal
  editId: string = '';

  setSelectedEditId(cardId: string) {
    console.log(this.editId);
    this.editId = cardId;
  }

  isEditCarModal: boolean = false;

  openEditCarModal() {
    this.isEditCarModal = true;
  }

  closeEditCarModal() {
    this.isEditCarModal = false;
  }

  // Delete Modal

  deleteId: string = '';
  isDeleteCarModal: boolean = false;

  setDeleteId(cardId: string) {
    this.deleteId = cardId;
  }

  openDeleteCarModal() {
    this.isDeleteCarModal = true;
  }

  closeDeleteCarModal() {
    this.isDeleteCarModal = false;
  }

  // Set as Default Modal

  defaultId: string = '';
  isDefaultCarModal: boolean = false;

  setDefaultId(cardId: string) {
    this.defaultId = cardId;
  }

  openDefaultCarModal() {
    this.isDefaultCarModal = true;
  }

  closeDefaultCarModal() {
    this.isDefaultCarModal = false;
  }

  isDriverLicenseModal: boolean = false;

  openDriverLicenseModal() {
    this.isDriverLicenseModal = true;
  }

  closeDriverLicenseModal() {
    this.isDriverLicenseModal = false;
  }
  // this will be the default Make User upload Driver License or they dont see the page and its blurred out
  isDriverModal: boolean = false;

  // checks if the user has already been verified as a driver (inputs Driver license information)
  async isUserADriver() {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('isDriver')
        .eq('firebaseId', auth?.currentUser?.uid)
        .single();
      if (error) {
        console.error('Error fetching user data:', error.message);
        return;
      }

      if (data) {
        this.isDriverModal = data.isDriver;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  addDriverLicenseInformation: boolean = false;

  changeAddDriverLicenseInformationHandler() {
    this.addDriverLicenseInformation = !this.addDriverLicenseInformation;
  }

  ngOnInit(): void {
    try {
      this.getCarList();
      this.isUserADriver();
    } catch (error) {
      console.log(error);
    }
  }
}
