import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const roleGuard: CanActivateFn = (route, state) => {
  // Obtenemos los roles necesarios para acceder a la ruta
  const roles = route.data['roles'] as string[];

  // Inyectamos los servicios necesarios
  const authService = inject(AuthService);
  const matSnackBar = inject(MatSnackBar);
  const router = inject(Router);

  // Obtenemos los roles del usuario actual
  const userRoles = authService.getRoles();

  // Si el usuario no ha iniciado sesión, lo redirigimos al login
  if (!authService.isLoggedIn()) {
    matSnackBar.open('No has iniciado sesión', 'Cerrar', { verticalPosition: 'top', duration: 5000 });
    router.navigate(['/login']);
    return false;
  }

  // Si el usuario tiene los roles necesarios, le permitimos el acceso
  if (roles.some((role) => userRoles?.includes(role))) return true;

  // Si el usuario no tiene los roles necesarios, lo redirigimos al inicio y mostramos un mensaje
  matSnackBar.open('No tienes permisos para acceder a esta página', 'Cerrar', {
    verticalPosition: 'top',
    duration: 5000,
  });
  router.navigate(['/']);

  return false;
};
