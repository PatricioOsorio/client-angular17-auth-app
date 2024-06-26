export interface UserDetail {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  roles: string[];
  phoneNumber: null | number;
  isDoubleFactoEnabled: boolean;
  isPhoneNumberConfirmed: boolean;
  accessFailedCount: number;
}
