import { AuthService } from './../../shared/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email : string = '';
  password : string = '';




  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }
  register(){

    if(this.email == ''){
      alert('Please enter correct credentials');
      return;
    }

    if(this.password == ''){
      alert('Please enter correct credentials');
      return;
    }

    this.auth.register(this.email,this.password);
    this.email ='';
    this.password = '';



  }

}
