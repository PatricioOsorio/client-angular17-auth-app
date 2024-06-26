import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  // inyectamos los servicios necesarios
  const matSnakckBar = inject(MatSnackBar);

  // si el usuario ha iniciado sesión, le permitimos el acceso
  if (inject(AuthService).isLoggedIn()) {
    return true;
  }

  // si el usuario no ha iniciado sesión, lo redirigimos al login y mostramos un mensaje
  matSnakckBar.open('Necesitas iniciar sesion para acceder a esta página', 'Entiendo', {
    duration: 3000,
  });
  inject(Router).navigate(['/login']);
  return false;
};
