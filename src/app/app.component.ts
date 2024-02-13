import { Component } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';
import { IUser } from './model/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'woodcast';
  push: any;


  isAuthenticated: any;
 

  constructor(private authGuard: AuthGuard) {

  }

  ngOnInit() {
    this.isAuthenticated = this.authGuard.canActivate();
  }

}
