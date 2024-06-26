import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { ButtonComponent } from '../../components/button/button.component';
import { MatInput, MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSelectModule } from '@angular/material/select';
import { RoleService } from '../../services/role.service';
import { Role } from '../../interfaces/role';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatIcon,
    ButtonComponent,
    MatInputModule,
    RouterLink,
    MatSelectModule,
    AsyncPipe,
    MatSnackBarModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  authService = inject(AuthService);
  formBuilder = inject(FormBuilder);
  roleService = inject(RoleService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);

  formRegister!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  errors?: ValidationErrors[];

  userDetail = this.authService.getUserCurrent();
  roles$!: Observable<Role[]>;

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group(
      {
        nombres: ['', Validators.required],
        apellidoPaterno: ['', Validators.required],
        apellidoMaterno: ['', Validators.required],
        correo: ['', [Validators.email, Validators.required]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        roles: ['', Validators.required],
      },
      {
        validator: this.passwordMatchValidator,
      },
    );

    this.roles$ = this.roleService.getRoles();
  }

  hasErrors = (controlName: string, errorType: string) =>
    this.formRegister.get(controlName)?.hasError(errorType) && this.formRegister.get(controlName)?.touched;

  isValid = (controlName: string) =>
    this.formRegister.get(controlName)?.valid && this.formRegister.get(controlName)?.touched;

  register(): void {
    this.authService.register(this.formRegister.value).subscribe({
      next: (response) => {
        console.log(response);
        if (response.isSuccess) {
          this.matSnackBar.open(response.message, 'Cerrar', {
            duration: 5000,
          });

          this.router.navigate(['/login']);
        } else {
          this.matSnackBar.open(response.message, 'Cerrar', {
            duration: 5000,
          });
        }
      },
      error: (err: HttpErrorResponse) => {
        this.errors = err.error;
        this.matSnackBar.open('Errores en el formulario', 'Cerrar', { duration: 5000 });
      },
      complete: () => console.log('register success'),
    });
  }

  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      // confirmPassword?.setErrors(null);
      return null;
    }
  }
}
