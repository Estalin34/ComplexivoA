import { CanActivateFn } from '@angular/router';

export const permisoGuard: CanActivateFn = (route, state) => {
  return true;
};
