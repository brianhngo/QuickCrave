export interface newUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password2: string;
}

export interface UserAuth {
  username: string;
  password: string;
}

export interface forgetPassword {
  email: string;
}

export interface changePassword {
  currentPassword: string;
  newPassword1: string;
  newPassword2: string;
}

export interface userPersonalInformation {
  firstName: string;
  lastName: string;
  personalInfo: {
    phoneNumber: string;
    street: string;
    apartmentNumber: string;
    postalCode: string;
    city: string;
    country: string;
  };
}

export interface userBillingInformation {
  id: string;
  info: {
    Number: string;
    Description: string;
    FirstName: string;
    LastName: string;
    cvc: string;
    ExpMonth: string;
    ExpYear: string;
  };
  billing: {
    street: string;
    apartmentNumber: string;
    postalCode: string;
    city: string;
    country: string;
  };
  isDefault: boolean;
}

export interface addCarInformation {
  id: string;
  carInfo: {
    state: string;
    carType: string;
    licensePlate: string;
    carBrand: string;
    carModel: string;
    carColor: string;
    carYear: string;
  };
  isDefault: boolean;
}

export interface driverLicenseInformation {
  driverLicenseFront: any;
  driverLicenseBack: any;
  id: string;
  isValidated: boolean;
  licenseNumber: string;
  licenseState: string;
  addressCity: string;
  addressStreet: string;
  addressZipcode: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  expDate: string;
}
