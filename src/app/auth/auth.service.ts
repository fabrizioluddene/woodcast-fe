import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { SharedDataLoginService } from '../services/shared-data-login.service';
import { Observable, map, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IUser } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean = false;
  private baseURL = 'http://localhost:8080';

  constructor(private http: HttpClient) { }
  logged: boolean = false;
  singIn(login: IUser): Observable<boolean> {

    return this.login(login).pipe(
      map(result => {
        if (result.logged) {
          localStorage.setItem("login", JSON.stringify(result));
          return true;
        } else {
          return false;
        }
      })
    );
  }

  login(varia: IUser): Observable<IUser> {
    const URL = this.baseURL + '/user/login';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        
      })
    };
    console.log(URL)
    return this.http.post<IUser>(URL, varia, httpOptions);
  }
}
