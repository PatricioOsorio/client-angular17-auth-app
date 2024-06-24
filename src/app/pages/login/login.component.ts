import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatFormField, MatSnackBarModule, MatInputModule, MatIcon, ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  hide = true;
  form!: FormGroup;
  _formBuilder = inject(FormBuilder);

  // injection of services
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    this.authService.login(this.form.value).subscribe({
      next: (response) => {
        if (response.isSuccess) {
          this.matSnackBar.open('Inicio de sesión exitoso', 'Cerrar', { duration: 5000 });
          this.router.navigate(['/']);
        } else {
          this.matSnackBar.open('Falló el inicio de sesión', 'Cerrar', { duration: 5000 });
        }
      },
      error: (error) => {
        const errorMessage = error.error.message || 'error';
        this.matSnackBar.open(errorMessage, 'Cerrar', { duration: 5000 });
      },
    });
  }
}
