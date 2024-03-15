import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AddCarModalComponent } from './add-car-modal/add-car-modal.component';
import { DeleteCarModalComponent } from './delete-car-modal/delete-car-modal.component';
import { EditCarModalComponent } from './edit-car-modal/edit-car-modal.component';
import { SetCarAsDefaultModalComponent } from './set-car-as-default-modal/set-car-as-default-modal.component';
import { supabase } from '../../../../supabase.config';
import { auth } from '../../firebase.config';
import { addCarInformation } from '../../user-auth-form/auth.interface';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-driver-profile',
  standalone: true,
  imports: [
    AddCarModalComponent,
    DeleteCarModalComponent,
    EditCarModalComponent,
    SetCarAsDefaultModalComponent,
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
          id: item.id,
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
    this.editId = cardId;
  }

  isEditCarModal: boolean = false;

  openEditCarModal() {
    this.isEditCarModal = true;
  }

  closeEditCarModal() {
    this.isEditCarModal = false;
  }

  ngOnInit(): void {
    try {
      this.getCarList();
    } catch (error) {
      console.log(error);
    }
  }
}
