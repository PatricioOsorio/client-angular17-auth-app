import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, map } from 'rxjs';
import { LoginRequest } from '../interfaces/login-request';
import { AuthResponse } from '../interfaces/auth-response';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { UserCurrent } from '../interfaces/user-current';
import { RegisterRequest } from '../interfaces/register-request';
import { UserDetail } from '../interfaces/user-detail';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl;

  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/account/register`, data);
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/account/login`, data).pipe(
      map((response) => {
        if (response.isSuccess) {
          localStorage.setItem(this.tokenKey, response.token);
        }
        return response;
      }),
    );
  }

  getUserDetail = (): Observable<UserDetail> => this.http.get<UserDetail>(`${this.apiUrl}/account/detail`);

  private getToken = (): string | null => localStorage.getItem(this.tokenKey) || null;

  getUserCurrent = (): UserCurrent | null => {
    const token = this.getToken();
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    const user: UserCurrent = {
      id: decodedToken.nameid,
      fullname: decodedToken.name,
      email: decodedToken.email,
      roles: decodedToken.role || [],
    };

    return user;
  };

  isLoggedIn = (): boolean => {
    const token = this.getToken();
    if (!token) return false;
    return !this.isTokenExpired();
  };

  private isTokenExpired = (): boolean => {
    const token = this.getToken();
    if (!token) return true;

    const decodedToken = jwtDecode(token);
    const isTokenExpired = Date.now() >= decodedToken['exp']! * 1000;

    if (isTokenExpired) this.logout();

    return isTokenExpired;
  };

  logout = (): void => localStorage.removeItem(this.tokenKey);
}
