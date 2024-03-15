import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  OnInit,
  OnChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { supabase } from '../../../../../supabase.config';
import { auth } from '../../../firebase.config';
import { addCarInformation } from '../../../user-auth-form/auth.interface';

@Component({
  selector: 'app-edit-car-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-car-modal.component.html',
  styleUrl: './edit-car-modal.component.css',
})
export class EditCarModalComponent implements OnChanges {
  @Input() editId = '';
  @Input() getCarList!: () => void;
  @Input() isEditCarModal = false;
  @Output() closed = new EventEmitter<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  closeEditCarModal() {
    this.isEditCarModal = false;
    this.resetErrorMessage();
    this.resetForm();
    this.closed.emit();
  }

  // These error are for when the user leaves input blank. Controlling the state
  licensePlateMessageError: boolean = false;
  stateMessageError: boolean = false;
  carTypeError: boolean = false;
  carBrandError: boolean = false;
  carModelError: boolean = false;
  carColorError: boolean = false;
  carYearError: boolean = false;

  resetErrorMessage() {
    this.licensePlateMessageError = false;
    this.stateMessageError = false;
    this.carTypeError = false;
    this.carBrandError = false;
    this.carModelError = false;
    this.carColorError = false;
    this.carYearError = false;
  }

  userSelectedInput: addCarInformation = {
    id: '',
    carInfo: {
      state: '',
      carType: '',
      licensePlate: '',
      carBrand: '',
      carModel: '',
      carColor: '',
      carYear: '',
    },
    isDefault: false,
  };

  resetForm() {
    this.userSelectedInput.id = '';
    this.userSelectedInput.carInfo = {
      state: '',
      carType: '',
      licensePlate: '',
      carBrand: '',
      carModel: '',
      carColor: '',
      carYear: '',
    };
    this.userSelectedInput.isDefault = false;
  }

  checkRequirements() {
    if (
      this.userSelectedInput.carInfo.licensePlate.length < 3 ||
      this.userSelectedInput.carInfo.licensePlate.length > 9
    ) {
      this.resetErrorMessage();
      this.licensePlateMessageError = true;
      return false;
    }

    if (this.userSelectedInput.carInfo.state.length < 1) {
      this.resetErrorMessage();
      this.stateMessageError = true;
      return false;
    }

    if (this.userSelectedInput.carInfo.carType.length < 1) {
      this.resetErrorMessage();
      this.carTypeError = true;
      return false;
    }

    if (this.userSelectedInput.carInfo.carBrand.length < 1) {
      this.resetErrorMessage();
      this.carBrandError = true;
      return false;
    }

    if (this.userSelectedInput.carInfo.carModel.length < 1) {
      this.resetErrorMessage();
      this.carModelError = true;
      return false;
    }

    if (this.userSelectedInput.carInfo.carColor.length < 1) {
      this.resetErrorMessage();
      this.carColorError = true;
      return false;
    }

    if (this.userSelectedInput.carInfo.carYear.length < 1) {
      this.resetErrorMessage();
      this.carYearError = true;
      return false;
    }

    return true;
  }

  listOfArray: string[] = [
    '2024',
    '2023',
    '2022',
    '2021',
    '2020',
    '2019',
    '2018',
    '2017',
    '2016',
    '2015',
    '2014',
    '2013',
    '2012',
    '2011',
    '2010',
    '2009',
    '2008',
    '2007',
    '2006',
    '2005',
    '2004',
  ];

  listOfColors: string[] = [
    'Black',
    'Gray',
    'White',
    'Silver',
    'Purple',
    'Red',
    'Pink',
    'Orange',
    'Yellow',
    'Blue',
    'Brown',
    'Green',
  ];

  carBrands: string[] = [
    'Rivian',
    'Honda',
    'Toyota',
    'Ford',
    'Chevrolet',
    'Volkswagen',
    'BMW',
    'Mercedes-Benz',
    'Audi',
    'Nissan',
    'Hyundai',
    'Kia',
    'Subaru',
    'Tesla',
    'Lexus',
    'Porsche',
    'Ferrari',
    'Lamborghini',
    'Jeep',
    'Dodge',
    'Mazda',
    'Volvo',
    'Jaguar',
    'Land Rover',
    'Chrysler',
    'GMC',
    'Buick',
    'Cadillac',
    'Acura',
    'Infiniti',
    'Mitsubishi',
    'Mini',
    'Alfa Romeo',
    'Rolls-Royce',
    'Bentley',
    'Aston Martin',
    'Maserati',
    'McLaren',
    'Genesis',
    'Lincoln',
    'Lotus',
    'Bugatti',
    'Smart',
    'Suzuki',
    'Ram',
    'Saab',
    'Isuzu',
    'SsangYong',
    'Tata Motors',
    'Dacia',
    'Other',
  ];
  carModels: { [brand: string]: string[] } = {
    Rivian: ['R1T', 'R1S', 'R2', 'R3'],
    Honda: ['Accord', 'CR-V', 'Civic', 'Pilot', 'Odyssey'],
    Toyota: ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Tacoma'],
    Ford: ['F-150', 'Escape', 'Explorer', 'Focus', 'Mustang'],
    Chevrolet: ['Silverado', 'Equinox', 'Malibu', 'Traverse', 'Tahoe'],
    Volkswagen: ['Jetta', 'Golf', 'Passat', 'Tiguan', 'Atlas'],
    BMW: ['3 Series', '5 Series', 'X3', 'X5', '7 Series'],
    'Mercedes-Benz': ['C-Class', 'E-Class', 'GLC', 'GLE', 'S-Class'],
    Audi: ['A4', 'Q5', 'A3', 'Q7', 'A6'],
    Nissan: ['Altima', 'Rogue', 'Sentra', 'Pathfinder', 'Murano'],
    Hyundai: ['Elantra', 'Sonata', 'Santa Fe', 'Tucson', 'Kona'],
    Kia: ['Optima', 'Forte', 'Sportage', 'Sorento', 'Telluride'],
    Subaru: ['Outback', 'Forester', 'Crosstrek', 'Impreza', 'Legacy'],
    Tesla: ['Model S', 'Model 3', 'Model X', 'Model Y'],
    Lexus: ['RX', 'ES', 'NX', 'IS', 'GX'],
    Porsche: ['911', 'Cayenne', 'Macan', 'Panamera', 'Taycan'],
    Ferrari: ['488', 'F8 Tributo', 'Portofino', 'SF90 Stradale', 'Roma'],
    Lamborghini: ['Huracan', 'Aventador', 'Urus'],
    Jeep: ['Wrangler', 'Grand Cherokee', 'Cherokee', 'Renegade', 'Gladiator'],
    Dodge: ['Charger', 'Challenger', 'Durango'],
    Mazda: ['Mazda3', 'Mazda6', 'CX-5', 'CX-9', 'MX-5 Miata'],
    Volvo: ['XC90', 'XC60', 'S60', 'V60', 'S90'],
    Jaguar: ['F-Pace', 'E-Pace', 'XE', 'XF', 'F-Type'],
    'Land Rover': [
      'Range Rover',
      'Range Rover Sport',
      'Discovery',
      'Evoque',
      'Defender',
    ],
    Chrysler: ['Pacifica', '300'],
    GMC: ['Sierra', 'Terrain', 'Acadia', 'Yukon', 'Canyon'],
    Buick: ['Encore', 'Enclave', 'Regal'],
    Cadillac: ['Escalade', 'XT5', 'CT5', 'CT4', 'XT4'],
    Acura: ['MDX', 'RDX', 'TLX', 'ILX', 'RLX'],
    Infiniti: ['Q50', 'QX60', 'QX80', 'QX50', 'Q60'],
    Mitsubishi: ['Outlander', 'Eclipse Cross', 'Mirage', 'Outlander Sport'],
    Mini: ['Cooper', 'Countryman', 'Clubman'],
    'Alfa Romeo': ['Giulia', 'Stelvio'],
    Fiat: ['500', '500X', '500L'],
    'Rolls-Royce': ['Phantom', 'Ghost', 'Cullinan', 'Wraith', 'Dawn'],
    Bentley: ['Continental GT', 'Bentayga', 'Flying Spur'],
    'Aston Martin': ['DB11', 'Vantage', 'DBS Superleggera', 'DBX'],
    Maserati: ['Ghibli', 'Levante', 'Quattroporte'],
    McLaren: ['720S', '570S', 'GT', '765LT'],
    Genesis: ['G70', 'G80', 'G90'],
    Lincoln: ['Navigator', 'Aviator', 'Nautilus', 'Corsair'],
    Lotus: ['Evora', 'Elise', 'Exige'],
    Bugatti: ['Chiron', 'Veyron', 'Divo'],
    Smart: ['Fortwo'],
    Suzuki: ['Swift', 'Vitara', 'Jimny'],
    Ram: ['1500', '2500', '3500'],
    Saab: ['9-3', '9-5'],
    Isuzu: ['D-Max', 'MU-X'],
    SsangYong: ['Korando', 'Rexton', 'Tivoli'],
    'Tata Motors': ['Tiago', 'Nexon', 'Harrier'],
    Dacia: ['Sandero', 'Duster', 'Logan'],
    Other: [],
  };

  setDefaultCarBrand(value: string): void {
    this.userSelectedInput.carInfo.carBrand = value;
    this.cdr.detectChanges();
  }

  setDefaultCarModel(value: string): void {
    this.userSelectedInput.carInfo.carModel = value;
    this.cdr.detectChanges();
  }
  onBrandChangeHandler(): void {
    this.userSelectedInput.carInfo.carModel = '';
    this.cdr.detectChanges();
  }

  onDefaultHandler() {
    this.userSelectedInput.isDefault = !this.userSelectedInput.isDefault;
  }

  async addCarHandler() {
    try {
      if (!this.checkRequirements()) {
        return;
      }

      if (this.userSelectedInput.isDefault) {
        // if isDefault is true, we need to change all the rest to false
        const { error } = await supabase
          .from('driver')
          .update({ isDefault: false })
          .eq('firebaseId', auth.currentUser?.uid)
          .eq('isDefault', true);
        if (error) {
          console.log(error);
        } else {
          this.closeEditCarModal();
        }
      }

      const { error } = await supabase.from('driver').insert({
        // new isDefault
        carInfo: {
          state: this.userSelectedInput.carInfo.state,
          carType: this.userSelectedInput.carInfo.carType,
          licensePlate: this.userSelectedInput.carInfo.licensePlate,
          carBrand: this.userSelectedInput.carInfo.carBrand,
          carModel: this.userSelectedInput.carInfo.carModel,
          carColor: this.userSelectedInput.carInfo.carColor,
          carYear: this.userSelectedInput.carInfo.carYear,
        },
        isDefault: this.userSelectedInput.isDefault,
        firebaseId: auth.currentUser?.uid,
      });

      if (error) {
        console.log(error);
      } else {
        this.getCarList();
        this.closeEditCarModal();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getCarInformation(id: string) {
    try {
      const { data, error } = await supabase
        .from('driver')
        .select('*')
        .eq('firebaseId', auth.currentUser?.uid)
        .eq('carId', id);
      if (error) {
        console.log(error);
      } else {
        this.userSelectedInput.carInfo.state = data[0].carInfo.state;
        this.userSelectedInput.carInfo.carType = data[0].carInfo.carType;
        this.userSelectedInput.carInfo.licensePlate =
          data[0].carInfo.licensePlate;
        this.userSelectedInput.carInfo.carBrand = data[0].carInfo.carBrand;
        this.userSelectedInput.carInfo.carModel = data[0].carInfo.carModel;
        this.userSelectedInput.carInfo.carColor = data[0].carInfo.carColor;
        this.userSelectedInput.carInfo.carYear = data[0].carInfo.carYear;
        this.userSelectedInput.id = data[0].id;
        this.userSelectedInput.isDefault = data[0].isDefault;
      }
    } catch (error) {
      console.error(error);
    }
  }

  ngOnChanges(changes: any): void {
    if (changes.editId && changes.editId.currentValue) {
      this.getCarInformation(changes.editId.currentValue);
    }
  }
}
