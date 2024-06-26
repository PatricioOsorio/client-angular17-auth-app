import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatMenuModule } from '@angular/material/menu';
import { UserCurrent } from '../../interfaces/user-current';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbar, MatButtonModule, MatIconModule, RouterLink, MatMenuModule, MatSnackBarModule, RouterLink],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  matSnackBar = inject(MatSnackBar);

  userDetail = this.authService.getUserCurrent();

  private routerSubscription: Subscription = new Subscription();

  isLoggedIn = (): boolean => this.authService.isLoggedIn();

  logout = () => {
    this.authService.logout();
    this.matSnackBar.open('Cerre de sesión correcto', 'Cerrar', { duration: 5000 });
    this.router.navigate(['/login']);
  };

  ngOnInit() {
    // subscribe to router events to update userDetail
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.userDetail = this.authService.getUserCurrent();
      });
  }
}
