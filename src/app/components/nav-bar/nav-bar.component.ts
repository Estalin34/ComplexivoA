import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

constructor(private  authService:AuthService,private router:Router){}

getUser(){
  return this.authService.getCurrentUser();
}
logout(){
  return this.authService.logout().then(()=>{
    this.router.navigate(["/home"]);
  })
}
}
