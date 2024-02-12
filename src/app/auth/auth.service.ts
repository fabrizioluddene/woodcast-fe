import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn=false;

  constructor() { }
  isAuthenticate(){
    return this.isLoggedIn;
  }
}
