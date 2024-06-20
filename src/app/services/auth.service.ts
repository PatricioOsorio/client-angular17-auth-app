import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/login-request';
import { AuthResponse } from '../interfaces/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl

  constructor() { }

  login (data : LoginRequest) : Observable<AuthResponse> {
     
  }
}
