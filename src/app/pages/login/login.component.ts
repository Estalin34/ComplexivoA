import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { AuthService } from '../../services/auth/auth.service';
import {  Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
selector: 'app-login',
standalone: true,
imports: [ReactiveFormsModule,CommonModule],
templateUrl: './login.component.html',
styleUrl: './login.component.css'
})
export class LoginComponent {
loginFrom:FormGroup;
errorMessage:string='';
showRegister:boolean=false;

constructor(private authService:AuthService,private formBuilder:FormBuilder,private router:Router){
  this.loginFrom=this.formBuilder.group({
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required,Validators.minLength(6)]],
  });
}
loginGoogle(){
  this.authService.loginGoogle().then(()=>{
    this.router.navigate(["/home"])
  })
}
login(){
  if(this.loginFrom.invalid)return;
  if(this.showRegister){
    this.authService.registerUser(this.email?.value, this.password?.value).then(()=>{
      this.showRegister=false;
      this.loginFrom.reset();
      return this.authService.logout();
    });
    return;
  
  }
  this.authService.login(this.email?.value, this.password?.value).then(()=>{
    this.router.navigate(["/home"]);
  })
}
toggleRegister(){
  this.showRegister= !this.showRegister;
}
get email(){return this.loginFrom.get('email')};
get password(){return this.loginFrom.get('password')}

}
