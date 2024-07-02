import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [ButtonComponent, FormsModule, MatIconModule],
  templateUrl: './forget-password.component.html',
  styles: ``,
})
export class ForgetPasswordComponent {
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);

  email!: string;
  showEmailSent = false;
  isSubmiting = false;

  forgetPassword() {
    this.isSubmiting = true;
    this.authService.forgotPassword(this.email).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.matSnackBar.open(response.message, 'Cerrar', {
            duration: 5000,
          });
          this.showEmailSent = true;
        } else {
          this.matSnackBar.open(response.message, 'Cerrar', {
            duration: 5000,
          });
        }
      },
      error: (err:HttpErrorResponse) => {
        this.matSnackBar.open(err.message, 'Cerrar', {
          duration: 5000,
        });
      },
      complete: () => {
        this.isSubmiting = false;
      },
    });
  }
}
