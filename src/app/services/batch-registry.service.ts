
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { IBatchRegistry } from '../model/batch-registry';
@Injectable({
  providedIn: 'root'
})
export class BatchRegistryService {

  private baseURL = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  getBatchRegistry(id:number | null): Observable<IBatchRegistry> {
    const URL = this.baseURL+'/customer/batch-registry/'+id;
    return this.http.get<IBatchRegistry>(URL);
   }

   save(varia: any): Observable<any> {
    const URL = this.baseURL + '/batch-registry/save';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    console.log(URL)
    return this.http.post<any>(URL, varia,httpOptions);
  }
}
