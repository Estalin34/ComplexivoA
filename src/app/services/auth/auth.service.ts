import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth) { }


  login(email:string, password:string){
    return signInWithEmailAndPassword(this.auth, email, password);
    
    
  }
  loginGoogle(){
    const  provider =new GoogleAuthProvider();
    return signInWithPopup(this.auth, provider);

  }
  registerUser(email:string,password:string){
    return createUserWithEmailAndPassword(this.auth, email, password);

  }
  logout(){
    return signOut(this.auth);
  }
  getCurrentUser(){
    return this.auth.currentUser;
  }

}
