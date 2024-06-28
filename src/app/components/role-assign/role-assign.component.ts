import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';
import { ButtonComponent } from '../button/button.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-role-assign',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, AsyncPipe, ButtonComponent],
  templateUrl: './role-assign.component.html',
  styles: ``,
})
export class RoleAssignComponent {
  authService = inject(AuthService);
  roleService = inject(RoleService);
  matSnackBar = inject(MatSnackBar);

  users$ = this.authService.getAllUsers();
  roles$ = this.roleService.getRoles();

  selectedUser: string = '';
  selectedRole: string = '';

  assignRole() {
    this.roleService.assignRole(this.selectedUser, this.selectedRole).subscribe({
      next: (response: { message: string }) => {
        this.users$ = this.authService.getAllUsers();
        this.roles$ = this.roleService.getRoles();
        this.matSnackBar.open(response.message, 'Cerrar', { duration: 5000 });
      },
      error: (error: any) => {
        this.users$ = this.authService.getAllUsers();
        this.roles$ = this.roleService.getRoles();
        this.matSnackBar.open(error.error.message, 'Cerrar', { duration: 5000 });
      },
    });
  }
}
