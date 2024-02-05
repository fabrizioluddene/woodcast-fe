import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ICustomer } from '../model/customer';
import { ICustomerService } from '../model/customer-service';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private baseURL = 'http://localhost:8080/customer';
  constructor(private http: HttpClient) { }
  getCustomer(): Observable<ICustomer[]> {
    const URL = this.baseURL + '/find-all';
    return this.http.get<ICustomer[]>(URL);
  }

  getCustomerServices(idCustomer:number | null): Observable<ICustomerService[]> {
    const URL = this.baseURL + '/'+idCustomer+'/service';
    return this.http.get<ICustomerService[]>(URL);
  }
  save(customerName:ICustomer): Observable<ICustomer> {
    const URL = this.baseURL + '/save';
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    console.log(URL)
    return this.http.post<any>(URL, customerName,httpOptions);
  }
}
