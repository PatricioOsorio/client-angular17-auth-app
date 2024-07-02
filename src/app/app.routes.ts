import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { AccountComponent } from './pages/account/account.component';
import { authGuard } from './guards/auth.guard';
import { UsersComponent } from './pages/users/users.component';
import { roleGuard } from './guards/role.guard';
import { RolesComponent } from './pages/role/roles.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'account/:id', component: AccountComponent, canActivate: [authGuard] },
  { path: 'forgetPassword', component: ForgetPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [roleGuard],
    data: {
      roles: ['ADMIN'],
    },
  },
  {
    path: 'roles',
    component: RolesComponent,
    canActivate: [roleGuard],
    data: { roles: ['ADMIN'] },
  },
];
