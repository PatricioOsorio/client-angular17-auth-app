import { Component, inject } from '@angular/core';
import { RoleFormComponent } from '../../components/role-form/role-form.component';
import { RoleService } from '../../services/role.service';
import { RoleCreateRequest } from '../../interfaces/tole-create-request';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [RoleFormComponent],
  templateUrl: './roles.component.html',
  styles: ``,
})
export class RolesComponent {
  roleService = inject(RoleService);
  matSnackBar = inject(MatSnackBar);
  errorMessage = '';
  role: RoleCreateRequest = {} as RoleCreateRequest;

  createRole(role: RoleCreateRequest) {
    this.roleService.createRole(role).subscribe({
      next: (response: { message: string }) => {
        this.matSnackBar.open(response.message, 'Cerrar', { duration: 5000 });
        this.errorMessage = '';
        this.role = {} as RoleCreateRequest;
      },
      error: (error:HttpErrorResponse) => {
        if (error.status === 400) this.errorMessage = error.error.message;
      }
    });
  }
}
