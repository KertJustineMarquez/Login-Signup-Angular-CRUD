import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/compat/auth'
import {GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth : AngularFireAuth, private router : Router) { }

  // login method
  login(email : string, password : string){
    this.fireauth.signInWithEmailAndPassword(email,password).then( res =>{
        localStorage.setItem('token','true')
        this.router.navigate(['dashboard']);

        if(res.user?.emailVerified == true){
          this.router.navigate(['dashboard']);
        } else{
          this.router.navigate(['/verify-email'])
        }




    }, err =>{
        alert('Something went wrong');
        this.router.navigate(['/login']);
    })
  }

  // register method
  register(email : string, password : string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then( res =>{
      alert('Registration Successful');
      this.router.navigate(['/login']);
      this.SendVerficationEmail(res.user);
    }, err =>{
      alert(err.message);
      this.router.navigate(['/register']);

    })
  }


  //sign out
  logout(){
    this.fireauth.signOut().then( () =>{
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  //forgot password
  forgotPassword(email: string){
    this.fireauth.sendPasswordResetEmail(email).then( () =>{
      this.router.navigate(['/verify-email']);
    }, err =>{
      alert('Something went wrong')
    })

  }

  // Send Email Verification
  SendVerficationEmail(user: any){

    this.fireauth.currentUser.then(u => u?.sendEmailVerification())
      .then(() =>{
        this.router.navigate(['/verifyEmail']);
      }, (err: any) =>{
          alert('Something Went Wrong. Not able to send mail to registered Email.');
      })

  }


  // signinwithgoogle

  googleSignIn(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res =>{
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token',JSON.stringify(res.user?.uid));
    }, err =>{
      alert(err.message);
    })
  }



}
