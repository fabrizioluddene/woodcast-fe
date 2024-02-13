import { CanActivateFn } from '@angular/router';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { SharedDataService } from '../services/shared-data-service.service';
import { SharedDataLoginService } from '../services/shared-data-login.service';
import { IUser } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isLoggedIn: boolean = false;
  constructor( private router: Router) {

  }

  canActivate(): boolean {
    let json = localStorage.getItem("login");
    let user:IUser={
      id: null,
      name: null,
      surname: null,
      username: null,
      password: null,
      logged: false,
      jwt: null,
      rules: undefined
    };
    if (json){
      user =JSON.parse(json)
    }
    if (user.logged) {

      return true;
    } else {
      // Redirect to the login page if the user is not logged in
      this.router.navigate(['/login']);
      return false;
    }
  }
}