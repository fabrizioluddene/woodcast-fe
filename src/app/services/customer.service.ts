import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ICustomer } from '../model/customer';
import { ICustomerService } from '../model/customer-service';
import { IBatchRegistry } from '../model/batch-registry';
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

  getCustomerServices(idCustomer:number | null): Observable<IBatchRegistry[]> {
    const URL = this.baseURL + '/'+idCustomer+'/service';
    return this.http.get<IBatchRegistry[]>(URL);
  }
  save(customerName:ICustomer): Observable<ICustomer> {
    const URL = this.baseURL + '/save';
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        
      })
    };
    console.log(URL)
    return this.http.post<any>(URL, customerName,httpOptions);
  }
}
