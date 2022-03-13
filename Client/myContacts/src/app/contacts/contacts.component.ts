import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { Contact, User } from '../Models/User';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  userContacts: Contact[]=[];
  newContact:Contact = new Contact();
  userid: string | null | undefined;
  userName:String | undefined | null = null;
  
  constructor(private _auth:AuthenticationService,private router:Router,private route:ActivatedRoute) { 
    
  }
  ngOnInit(): void {
    this.userName=localStorage.getItem('user')?.split('@')[0];
   this.userid = this.route.snapshot.paramMap.get('_id');
   console.log("get details for",this.userid);
    this._auth.getContacts(this.userid??"0").subscribe(x=>
      {
        this.userContacts =x;
        console.log("the contacts x",x);
      } )
  }

  addContact()
  {
    this._auth.addContact(this.userid??"0",this.newContact).subscribe(x=>
      {
        this.userContacts =x;
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
      });
  }
  removeContact(_id:string){
    this._auth.removeContact(this.userid??"0",_id).subscribe(x=>
      {
        const currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([currentUrl]);
      });
      });
    }

    logout(){
      this._auth.logout();
      this.router.navigate(['/sign-in']);
    }

}
