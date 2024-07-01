export interface UserDetail {
  id: string;
  names: string;
  paternalLastName: string;
  mothersLastName: string;
  email: string;
  roles: string[];
  phoneNumber: null | number;
  isDoubleFactoEnabled: boolean;
  isPhoneNumberConfirmed: boolean;
  accessFailedCount: number;
}
