import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { IUser } from 'src/app/model/user';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MsalService } from '@azure/msal-angular';


const GRAPH_ENDPOINT_ME = 'https://graph.microsoft.com/v1.0/me';
const GRAPH_ENDPOINT_ME_PHOT = 'https://graph.microsoft.com/v1.0/me/photo';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string,
  mail?: string,

};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  profile!: ProfileType;
  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient, private msAuthService: MsalService

  ) { }
  loginErrorVisible: string | undefined;
  ngOnInit() {
    this.getProfile();



  }

  clear() {
    this.loginErrorVisible = undefined;
  }
  login() {
    let user: IUser = {
      username: null,
      id: null,
      name: null,
      surname: null,
      password: null,
      logged: null,
      jwt: null,
      rules: undefined
    };
    user.username = this.profile.mail;
    user.password = "sdfhjsdf6sdffwywe663_$$sadf";
    this.authService.singIn(user).subscribe(r => {

    
      if (r) {

        this.router.navigate(['']).then(() => {
          location.reload()
        });

      } else {
        
        user.surname = this.profile.surname;
        user.name = this.profile.givenName;
        this.authService.insertUser(user).subscribe(res => {
          this.authService.singIn(user).subscribe(r => {
            this.router.navigate(['']).then(() => {
             
            });
          });
        });
      }
    });
  }
  getProfile() {

    const account = this.msAuthService.instance.getAllAccounts()[0];

    this.msAuthService.instance.acquireTokenSilent({
      scopes: ['user.read'],
      account: account
    }).then((response) => {


      const token = response.accessToken;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        })
      };
    
      
      return this.http.get(GRAPH_ENDPOINT_ME, httpOptions).subscribe(profile => {
        console.log(profile)

        this.profile = profile;

        this.login();
      });


    })




  }
}
