import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from '../../interfaces/role';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [MatIcon],
  templateUrl: './role-list.component.html',
  styles: ``,
})
export class RoleListComponent {
  @Input({ required: true }) roles!: Role[] | null;
  @Output() deleteRoleEmmiter: EventEmitter<string> = new EventEmitter<string>();

  deleteRole(id: string) {
    this.deleteRoleEmmiter.emit(id);
  }
}
