import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';


const GRAPH_ENDPOINT_ME = 'https://graph.microsoft.com/v1.0/me/photo/$value';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
};

@Component({
  selector: 'app-prifile',
  templateUrl: './prifile.component.html',
  styleUrls: ['./prifile.component.css']
})
export class PrifileComponent implements OnInit {
  profile!: ProfileType;
  photoUrl: string = "";
  constructor(
    private http: HttpClient, private authService: MsalService
  ) { }

  ngOnInit() {
    this.getProfile();
  }
  logout() { // Add log out function here
    this.authService.logoutRedirect({
      postLogoutRedirectUri: 'http://localhost:4200'
    });
  }

  async getProfile() {

    const account = this.authService.instance.getAllAccounts()[0];
    await this.authService.instance.initialize();
    this.authService.instance.acquireTokenSilent({
      scopes: ['user.read'],
      account: account
    }).then((response) => {

  
      const token = response.accessToken;

     
      this.http.get('https://graph.microsoft.com/v1.0/me/photo/$value', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token
        }),
        responseType: 'blob' // Imposta il tipo di risposta a 'blob'
      }).subscribe((data: Blob) => {
    
        // Converti il blob in un URL di oggetto
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = () => {
      
          this.photoUrl =    `url(${reader.result})`;
        };
      });

    })




  }
}
