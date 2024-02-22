import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';
import { IUser } from '../model/user';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request)
    this.spinnerService.show(); // Mostra lo spinner prima di inviare la richiesta
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
    const token = user.jwt;
    if (token) {
      request = request.clone({
        setHeaders: {
          "user-info-jwt": token
        }
      });
    }
  
  
    return next.handle(request).pipe(
      finalize(() => {
        this.spinnerService.hide(); // Nasconde lo spinner quando la richiesta è completata
      })
    );
  }
}
