import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  isLoading: boolean | undefined;
  constructor(private spinnerService: SpinnerService) { }
  ngOnInit(): void {
    // Sottoscrizione all'observable dello spinner per aggiornare lo stato di caricamento
    this.spinnerService.spinnerState$.subscribe((state: boolean) => {
      this.isLoading = state; // Aggiorna lo stato di caricamento
    });
  }

}
