import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication.service';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {

  SignUpUserData:User=new User();
  constructor(private _auth:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
  }

  SignUpUser(){
    this._auth.signUp(this.SignUpUserData).subscribe(data => {
      localStorage.setItem('token',data.token);
      localStorage.setItem('user',data.user.userName);
      this.router.navigate(['/my-contacts/'+data.user._id]);
    },err => {
      alert(err.error.text);
      console.log(err)
    })
  }
}
