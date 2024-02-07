import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IForecastCalendarSave } from '../model/forecast-calendar-save';
import { IForecast } from '../model/forecast';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {

  private baseURL = 'http://localhost:8080/forecast';
  constructor(private http: HttpClient) { }

  

   create(varia: IForecastCalendarSave): Observable<any> {
    const URL = this.baseURL + '/create';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    console.log(URL)
    return this.http.post<any>(URL, varia,httpOptions);
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

  getForecast(idCustomer:number | null): Observable<any[]> {
    const URL = this.baseURL + '/'+idCustomer;
    return this.http.get<any[]>(URL);
  }
}