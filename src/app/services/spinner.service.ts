import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  
  private spinnerSubject = new BehaviorSubject<boolean>(false);

  // Observable per ascoltare i cambiamenti dello stato dello spinner
  spinnerState$ = this.spinnerSubject.asObservable();

  constructor() { }

  // Metodo per mostrare lo spinner
  show(): void {
    this.spinnerSubject.next(true);
  }

  // Metodo per nascondere lo spinner
  hide(): void {
    this.spinnerSubject.next(false);
  }
}
