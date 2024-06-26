import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe, CommonModule, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { UserDetail } from '../../interfaces/user-detail';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, AsyncPipe, UpperCasePipe, TitleCasePipe],
  templateUrl: './account.component.html',
  styles: ``,
})
export class AccountComponent implements OnInit {
  authService = inject(AuthService);
  accountDetail$: Observable<UserDetail> = this.authService.getUserDetail();

  ngOnInit(): void {
    this.accountDetail$ = this.authService.getUserDetail();
  }
}
