import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';
import { ButtonComponent } from '../button/button.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDetail } from '../../interfaces/user-detail';
import { Role } from '../../interfaces/role';

@Component({
  selector: 'app-role-assign',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, AsyncPipe, ButtonComponent],
  templateUrl: './role-assign.component.html',
  styles: ``,
})
export class RoleAssignComponent {
  selectedUser: string = '';
  selectedRole: string = '';

  @Input({ required: true }) users!: UserDetail[] | null;
  @Input({ required: true }) roles!: Role[] | null;

  @Output() assignRoleEmmiter: EventEmitter<[string, string]> = new EventEmitter<[string, string]>();

  assignRole(selectedUser: string, selectedRole: string) {
    this.assignRoleEmmiter.emit([selectedUser, selectedRole]);
  }
}
