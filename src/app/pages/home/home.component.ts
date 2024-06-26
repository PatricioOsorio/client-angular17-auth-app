import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {
 authService = inject(AuthService);

 userDetail = this.authService.getUserCurrent();
}
