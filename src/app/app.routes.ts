import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PeliculasComponent } from './pages/peliculas/peliculas.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { PeliculasFromComponent } from './pages/peliculas-from/peliculas-from.component';
import { ConfirmacionComponent } from './pages/confirmacion/confirmacion.component';

export const routes: Routes = [
    {path:"home",component:HomeComponent},
    {path:"peliculas",component:PeliculasComponent, ...canActivate(()=>redirectUnauthorizedTo(["/login"]))},
   
    { path:"peliculas-from", component: PeliculasFromComponent, ...canActivate(()=>redirectUnauthorizedTo(["/login"]))},
    {path:"peliculas-from/:id",component:PeliculasFromComponent},
    {path:"confirmacion",component:ConfirmacionComponent},
    {path:"login",component:LoginComponent},
    {path:"**",component:NotFoundComponent},

];
