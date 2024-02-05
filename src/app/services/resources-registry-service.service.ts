import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { IResourceRegistry } from "../model/resource-registry"
import { IResourceParam } from '../model/resource-param';
@Injectable({
  providedIn: 'root'
})
export class ResourcesRegistryServiceService {
  private baseURL = 'http://localhost:8080/resource';
  constructor(private http: HttpClient) { }

  getRandomUsers(): Observable<IResourceRegistry> {
    const URL = this.baseURL + '/find-all';
    return this.http.get<IResourceRegistry>(URL);
  }

  getAllParamResource(): Observable<IResourceParam[]> {
    const URL = this.baseURL + '/rate-param/find-all';
    return this.http.get<IResourceParam[]>(URL);
  }

  save(varia: any): Observable<any> {
    const URL = this.baseURL + '/save';
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
