import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IUser } from 'src/app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = this._formBuilder.group({


    username: ['', [Validators.required]],
    password: ['', [Validators.required]],


  });
  user: IUser = {
    username: null,
    id: null,
    name: null,
    surname: null,
    password: null,
    logged: null,
    jwt: null,
    rules: undefined
  };
  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,

  ) { }
  loginErrorVisible: string |undefined;
  
  sub() {
    var rate: number;

    if ('INVALID' !== this.form.status) {

      this.user.username = this.form.controls['username'].value;
      this.user.password = this.form.controls['password'].value
      this.authService.singIn(this.user).subscribe(r=>{
        
        if (r) {
        
          this.router.navigate(['']).then(()=>{
            location.reload()
          });
          
        } else {
          this.loginErrorVisible = "Utente o password errata";
        }
      });
      
      
      
    } else {
      this.loginErrorVisible = "Inserire utente e password";
    }
  }
  clear(){
    this.loginErrorVisible = undefined;
  }
}
