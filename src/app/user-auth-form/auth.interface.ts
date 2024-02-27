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
