import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const matSnakckBar = inject(MatSnackBar);

  if (inject(AuthService).isLoggedIn()) {
    return true;
  }

  matSnakckBar.open('Necesitas iniciar sesion para acceder a esta página', 'Entiendo', {
    duration: 3000,
  });
  inject(Router).navigate(['/login']);
  return false;
};
