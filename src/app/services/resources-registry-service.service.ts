import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { IResourceRegistry } from "../model/resource-registry"
import { IResourceParam } from '../model/resource-param';
import { IResourceAllocation } from '../model/resource-allocation';
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
  findAllResourceCalendar(idService: any,typeSearch:any): Observable<IResourceRegistry> {
    const URL = this.baseURL + '/find-all/calendar/service-registry/'+idService+"?typeSearch="+typeSearch;
    console.log(URL)
    return this.http.get<IResourceRegistry>(URL);
  }

 

  save(varia: any): Observable<any> {
    const URL = this.baseURL + '/save';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        
      })
    };
    console.log(URL)
    return this.http.post<any>(URL, varia,httpOptions);
  }

  getResourceAllocation():Observable<IResourceAllocation[]> {
    const URL = this.baseURL + '/allocation';
    console.log(URL)
    return this.http.get<IResourceAllocation[]>(URL);
  }

  findByMonthAndResouceId(resourceId:any,month:any):Observable<any[]> {
    const URL = this.baseURL + '/'+resourceId+'/allocation/month/'+month;
    console.log(URL)
    return this.http.get<any[]>(URL);
  }
}
