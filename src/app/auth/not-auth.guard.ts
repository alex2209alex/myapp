import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const notAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.user.pipe(
    take(1),
    map(user => {
      const isAuth = !!user;
      if (!isAuth) {
        return true;
      }
      return router.createUrlTree(['/']);
    }));
};
