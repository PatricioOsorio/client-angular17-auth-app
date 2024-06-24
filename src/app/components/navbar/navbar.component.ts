import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { UserDetail } from '../../interfaces/user-detail';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbar, MatButtonModule, MatIconModule, RouterLink, MatMenuModule, MatSnackBarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  matSnackBar = inject(MatSnackBar);
  userDetail?: UserDetail | null;

  ngOnInit(): void {
    this.userDetail = this.authService.getUserDetail();
  }

  isLoggedIn = () => this.authService.isLoggedIn();

  logout = () => {
    this.authService.logout();
    this.matSnackBar.open('Cerre de sesión correcto', 'Cerrar', { duration: 5000 });
    this.router.navigate(['/login']);
  };
}
