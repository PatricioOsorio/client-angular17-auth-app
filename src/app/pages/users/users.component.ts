import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { UserDetail } from '../../interfaces/user-detail';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './users.component.html',
  styles: ``,
})
export class UsersComponent {
  authService = inject(AuthService);

  users$: Observable<UserDetail[]> = this.authService.getAllUsers();
}
