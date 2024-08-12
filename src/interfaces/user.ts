export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles?: string[];
  password?: string;
  phoneNumber?: string;
}

export interface IUserWithPassword extends IUser {
  password: string;
}

export interface IUserWithConfirmPassword extends IUserWithPassword {
  confirmPassword: string;
}
