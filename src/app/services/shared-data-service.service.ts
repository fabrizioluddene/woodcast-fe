import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private variableSource = new BehaviorSubject<any>(null);
  variable$ = this.variableSource.asObservable();

  updateVariable(object: any) {
    this.variableSource.next(object);
  }
}