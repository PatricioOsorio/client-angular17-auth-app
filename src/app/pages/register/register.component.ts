import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { ButtonComponent } from '../../components/button/button.component';
import { MatInput, MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSelectModule } from '@angular/material/select';
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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  formRegister!: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  authService = inject(AuthService);

  userDetail = this.authService.getUserDetail();
  roles = this.userDetail?.roles || ['BASIC'];

  _formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.formRegister = this._formBuilder.group({
      nombres: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      roles : ['', Validators.required],
    });
  }
}
