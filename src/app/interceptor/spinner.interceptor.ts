import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { SpinnerService } from '../service/spinner.service';

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.show(); // Mostra lo spinner prima di inviare la richiesta
    return next.handle(request).pipe(
      finalize(() => {
        this.spinnerService.hide(); // Nasconde lo spinner quando la richiesta è completata
      })
    );
  }
}
