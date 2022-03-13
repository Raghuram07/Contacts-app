import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { Contact, User } from './Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  logout() {
      localStorage.removeItem('token');
    }
  
  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
     return localStorage.getItem('token')
  }

  constructor(private http:HttpClient) { }
  private _endpoint ="http://localhost:5000/";

  signIn(user:User):Observable<any> {
    let url = this._endpoint+'sign-in';
    return this.http.post<any>(url,user)
  }

  signUp(user:User):Observable<any> {
    let url = this._endpoint+'sign-up';
    return this.http.post<any>(url,user);
  }

  getContacts(userid:string):Observable<Contact[]> {
    console.log('getContacts for ',userid);
    let url = this._endpoint+'contacts';
    return this.http.post<any>(url,{"_id":userid});
  }

  addContact(userid:string,contact:Contact):Observable<Contact[]> {
    let url= this._endpoint+'add-contact';
    return this.http.post<any>(url,{"_id":userid,"contact":contact})
  }
  removeContact(userid:string,contactid:string):Observable<any>{
    let url= this._endpoint+'remove-contact';
    return this.http.post<any>(url,{"userid":userid,"contactid":contactid});
  }
}
