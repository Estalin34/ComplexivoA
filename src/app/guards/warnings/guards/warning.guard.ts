import { CanDeactivateFn } from '@angular/router';
import { from } from 'rxjs';
import { PeliculasComponent } from '../../../pages/peliculas/peliculas.component';
import { PeliculasFromComponent } from '../../../pages/peliculas-from/peliculas-from.component';

export const warningGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  const currentComponent=component as PeliculasFromComponent;
  if(currentComponent.form.touched){
    return window.confirm("Estas seguro que desea abandonar la pagina");
  }
  return true;
};
