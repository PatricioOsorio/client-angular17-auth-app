export interface RegisterRequest {
  names: string;
  paternalLastName: string;
  mothersLastName: string;
  email: string;
  password: string;
  roles: string[];
}
