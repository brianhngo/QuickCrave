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
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
} from 'firebase/storage';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ViewDriverLicenseInfoComponent } from '../view-driver-license-info/view-driver-license-info.component';

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
    ViewDriverLicenseInfoComponent,
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
  driverLicenseInfo: Object = {};

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
        const isDriverLicenseValid =
          data.driverLicense && Object.keys(data.driverLicense).length !== 0;

        if (data.isValidated === 'TRUE' && isDriverLicenseValid) {
          // User is validated and the driverLicense is not empty
          this.driverLicenseInfo = data.driverLicense;
          this.isDriverModal = data.isDriver;
          this.isUserValidated = data.isValidated;
        } else if (data.isValidated === 'PENDING' && isDriverLicenseValid) {
          // User has inputted data but is waiting to be verified
          this.isDriverModal = data.isDriver;
          this.addDriverLicenseInformation = false;
          this.isUserValidated = data.isValidated;
        } else if (data.isValidated === 'FALSE' && !isDriverLicenseValid) {
          // User has not inputted anything
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
    driverLicenseFrontLink: '',
    driverLicenseBack: null,
    driverLicenseBackLink: '',
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

      // Upload the files when the user submits
      if (this.driverLicenseInformation.driverLicenseFront) {
        await this.onFileChange(
          this.driverLicenseInformation.driverLicenseFront,
          'front'
        );
      }
      if (this.driverLicenseInformation.driverLicenseBack) {
        await this.onFileChange(
          this.driverLicenseInformation.driverLicenseBack,
          'back'
        );
      }

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
  frontFileName: string = '';
  backFileName: string = '';
  handleFileChange(event: any, type: 'front' | 'back'): void {
    const file = event.target.files[0];
    if (type === 'front') {
      this.frontFileName = event.target.files[0];
    } else {
      this.backFileName = event.target.files[0];
    }
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const blob = new Blob([reader.result as ArrayBuffer], {
          type: file.type,
        });
        if (type === 'front') {
          this.driverLicenseInformation.driverLicenseFront = blob;
        } else if (type === 'back') {
          this.driverLicenseInformation.driverLicenseBack = blob;
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  // saves file into DB
  async onFileChange(file: File, type: string): Promise<void> {
    try {
      // Get the current user ID
      const userId = auth?.currentUser?.uid;
      if (!userId) {
        console.error('User ID not available');
        return;
      }

      console.log(file, 'file');

      // Create a file path using user ID, type, and file name

      let filePath = ``;

      if (status === 'type') {
        filePath = `${userId}/${type}/${this.frontFileName}`;
      } else {
        filePath = `${userId}/${type}/${this.backFileName}`;
      }

      // Create a reference to the file path in Firebase Storage
      const fileRef = ref(storage, filePath);

      // Convert the file to base64 format
      const base64Data = await this.fileToBase64(file);

      // Remove the prefix (e.g., "data:image/jpeg;base64,") from base64 data
      const base64Content = base64Data.split(',')[1];

      // Set metadata for content type
      const metadata = {
        contentType: file.type,
      };

      // Upload the base64 data to Firebase Storage
      const uploadTask = uploadString(
        fileRef,
        base64Content,
        'base64',
        metadata
      );

      // Retrieve the download URL after the upload is complete
      const downloadURL = await uploadTask.then(() => getDownloadURL(fileRef));

      console.log('File uploaded successfully. Download URL:', downloadURL);

      // Update state based on the file type
      if (type === 'front') {
        console.log('Uploaded front of driver license');
        this.driverLicenseInformation.driverLicenseFrontLink = downloadURL;
      } else if (type === 'back') {
        console.log('Uploaded back of driver license');
        this.driverLicenseInformation.driverLicenseBackLink = downloadURL;
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  isViewDriverLicenseInfo: boolean = false;

  openDriverLicenseModalInfo() {
    this.isViewDriverLicenseInfo = true;
  }

  closeDriverLicenseModalInfo() {
    this.isViewDriverLicenseInfo = false;
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
