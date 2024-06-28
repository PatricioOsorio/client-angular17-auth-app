import { Component, inject } from '@angular/core';
import { RoleFormComponent } from '../../components/role-form/role-form.component';
import { RoleService } from '../../services/role.service';
import { RoleCreateRequest } from '../../interfaces/tole-create-request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { RoleListComponent } from '../../components/role-list/role-list.component';
import { RoleAssignComponent } from '../../components/role-assign/role-assign.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [RoleFormComponent, RoleListComponent, RoleAssignComponent, AsyncPipe],
  templateUrl: './roles.component.html',
  styles: ``,
})
export class RolesComponent {
  roleService = inject(RoleService);
  matSnackBar = inject(MatSnackBar);
  authService = inject(AuthService);

  errorMessage = '';
  role: RoleCreateRequest = {} as RoleCreateRequest;

  roles$ = this.roleService.getRoles();
  users$ = this.authService.getAllUsers();

  createRole(role: RoleCreateRequest) {
    this.roleService.createRole(role).subscribe({
      next: (response: { message: string }) => {
        this.matSnackBar.open(response.message, 'Cerrar', { duration: 5000 });
        this.errorMessage = '';
        this.role = {} as RoleCreateRequest;
        this.roles$ = this.roleService.getRoles();
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 400) this.errorMessage = error.error.message;
      },
    });
  }

  deleteRole(id: string) {
    this.roleService.deleteRole(id).subscribe({
      next: (response: { message: string }) => {
        this.roles$ = this.roleService.getRoles();
        this.matSnackBar.open(response.message, 'Cerrar', { duration: 5000 });
      },
      error: (error: HttpErrorResponse) => {
        this.matSnackBar.open(error.error.message, 'Cerrar', { duration: 5000 });
      },
    });
  }

  assignRole([selectedUser, selectedRole]: [string, string]) {
    this.roleService.assignRole(selectedUser, selectedRole).subscribe({
      next: (response: { message: string }) => {
        this.roles$ = this.roleService.getRoles();
        this.matSnackBar.open(response.message, 'Cerrar', { duration: 5000 });
      },
      error: (error: any) => {
        this.matSnackBar.open(error.error.message, 'Cerrar', { duration: 5000 });
      },
    });
  }
}
