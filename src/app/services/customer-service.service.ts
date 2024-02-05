import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICustomerService } from '../model/customer-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {

  private baseURL = 'http://localhost:8080/customer-service';
  constructor(private http: HttpClient) { }
 

 
  save(iCustomerService:ICustomerService,cuStomerId :number | null): Observable<ICustomerService> {
    const URL = this.baseURL + '/customer/'+cuStomerId+'/save';
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    console.log(URL)
    return this.http.post<any>(URL, iCustomerService,httpOptions);
  }
}
