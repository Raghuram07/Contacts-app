import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  SignInUserData:User=new User();
  constructor(private _auth:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
  }
  SignInUser(){
    this._auth.signIn(this.SignInUserData).subscribe(data => {
      localStorage.setItem('token',data.token);
      localStorage.setItem('user',data.user.userName);
      this.router.navigate(['/my-contacts/'+data.user._id]);
    },
    err=>{
      alert(err.error);
    },)
    
  }

}
