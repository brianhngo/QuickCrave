import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AddCarModalComponent } from './add-car-modal/add-car-modal.component';
import { DeleteCarModalComponent } from './delete-car-modal/delete-car-modal.component';
import { EditCarModalComponent } from './edit-car-modal/edit-car-modal.component';
import { SetCarAsDefaultModalComponent } from './set-car-as-default-modal/set-car-as-default-modal.component';
import { supabase } from '../../../../supabase.config';
import { auth, app, firebaseConfig, storage } from '../../firebase.config';
import { addCarInformation } from '../../user-auth-form/auth.interface';
import { CommonModule } from '@angular/common';
import { AddDriverLicenseComponent } from './add-driver-license/add-driver-license.component';
import { EditDriverLicenseComponent } from './edit-driver-license/edit-driver-license.component';
import { FormsModule } from '@angular/forms';
import { driverLicenseInformation } from '../../user-auth-form/auth.interface';
import { Observable } from 'rxjs';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

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
    FormsModule,
    AngularFireStorageModule,
  ],

  templateUrl: './driver-profile.component.html',
  styleUrl: './driver-profile.component.css',
})
export class DriverProfileComponent implements OnInit {
  // Inject AngularFireStorage in the constructor
  constructor(private cdr: ChangeDetectorRef) {}

  // Properties and variables

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
        .select('isDriver, isValidated, driverLicense')
        .eq('firebaseId', auth?.currentUser?.uid)
        .single();

      if (error) {
        console.error('Error fetching user data:', error.message);
        return;
      }

      if (data) {
        if (
          data.isValidated === 'TRUE' &&
          Object.keys(data.driverLicense).length !== 0
        ) {
          // Checking if the user been validated and the driverLicense is not empty
          this.isDriverModal = data.isDriver; // going to change the isDriverModal to true, meaning driver profile appears
          this.isUserValidated = data.isValidated;
        } else if (
          data.isValidated === 'PENDING' &&
          Object.keys(data.driverLicense).length !== 0
        ) {
          // User has inputted Data but waiting to be verified

          this.isDriverModal = data.isDriver;
          this.addDriverLicenseInformation = false;
          this.isUserValidated = data.isValidated;
        } else if (
          data.isValidated === 'FALSE' &&
          Object.keys(data.driverLicense).length === 0
        ) {
          // user has yet to input anything

          this.isDriverModal = data.isDriver;
          this.addDriverLicenseInformation = false;
          this.isUserValidated = data.isValidated;
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  addDriverLicenseInformation: boolean = false;

  changeAddDriverLicenseInformationHandler() {
    this.addDriverLicenseInformation = !this.addDriverLicenseInformation;
  }

  driverLicenseInformation: driverLicenseInformation = {
    driverLicenseFront: null,
    driverLicenseBack: null,
    id: '',
    isValidated: false,
    licenseNumber: '',
    licenseState: '',
    addressCity: '',
    addressStreet: '',
    addressZipcode: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    expDate: '',
  };

  isUserValidated = '';

  // submit DL info Handler
  async submitDriverLicenseInfo() {
    try {
      this.isUserValidated = 'PENDING';

      await this.onFileChange(
        this.driverLicenseInformation.driverLicenseFront,
        'front'
      ),
        await this.onFileChange(
          this.driverLicenseInformation.driverLicenseBack,
          'back'
        );

      await supabase
        .from('users')
        .update({
          driverLicense: this.driverLicenseInformation,
          isValidated: this.isUserValidated,
        })
        .eq('firebaseId', auth?.currentUser?.uid);

      this.isUserADriver();
      this.changeAddDriverLicenseInformationHandler();
    } catch (error) {
      console.log(error);
    }
  }

  // saves file into DB
  async onFileChange(file: any, type: any): Promise<void> {
    try {
      // Ensure file is provided
      if (!file) {
        console.error('No file provided.');
        return;
      }

      // Define the file path
      const filePath = `${auth?.currentUser?.uid}/${type}/${file}`;
      console.log('Uploading file to:', filePath);

      // Create a reference to the file path
      const fileRef = ref(storage, filePath);

      // Upload the file
      await uploadBytes(fileRef, file);
      console.log('File uploaded successfully.');

      // Get the download URL of the file
      const downloadURL = await getDownloadURL(fileRef);

      // Store download URL in appropriate part of driver license information
      if (type === 'front') {
        this.driverLicenseInformation.driverLicenseFront = downloadURL;
      } else if (type === 'back') {
        this.driverLicenseInformation.driverLicenseBack = downloadURL;
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  ngOnInit(): void {
    try {
      this.isUserADriver();
      this.getCarList();
    } catch (error) {
      console.log(error);
    }
  }
}
