import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ContactsComponent } from './contacts/contacts.component';
import { LoginComponent } from './SSO/SignIn/login.component';
import { SignUpComponent } from './SSO/signUp/sign-up.component';

const routes: Routes = [
  {path:'', redirectTo:'/sign-in',pathMatch: 'full'},
  {path:'sign-in',component:LoginComponent},
  {path:'sign-up',component:SignUpComponent},
  {path:'my-contacts/:_id',component:ContactsComponent,canActivate:[AuthGuard]},
  {path:'**', redirectTo:'/sign-in',pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
